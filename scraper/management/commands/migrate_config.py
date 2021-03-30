import json
import os.path
import sys
from os import path

import django.core.files

# Commented out because want to avoid having an additional dependency for temporary script
# from datadiff import diff
from django.core.management.base import BaseCommand, CommandError
from jsonpath_rw import jsonpath, parse

from apps.core.management.commands._util import (
    calculate_hash,
    configure_transformations,
    get_domain_targets,
    get_ordered_domains_list,
    load_domain_config,
    setup_domain_and_transformations,
)

"""
This command transforms the fmgen layouts of all domains into the new caceis-holdings layout.
The command receives domain information and churns out the new version based on the general template.
You can either work the command for a specific domain, or for all domains.
"""

# function that loops through json file and replaces values


def nested_replace(structure, original, new):
    if type(structure) == list:
        return [nested_replace(item, original, new) for item in structure]

    if type(structure) == dict:
        return {
            key: nested_replace(value, original, new)
            for key, value in structure.items()
        }

    if structure == original:
        return new
    else:
        return structure


class Command(BaseCommand):
    help = "transforms from FMGEN layout to Simcorp Dimension Layout 2.0"

    def add_arguments(self, parser):
        parser.add_argument(
            "--domain",
            action="store",
            dest="domain",
            default="all",
            help="Domain slug (default: update all domains)",
        )
        parser.add_argument(
            "--organization",
            action="store",
            dest="organization",
            default="kasbank",
            help="Client organization slug (default: kasbank)",
        )

    def handle(self, *args, **options):

        # determine organization, domain from --domain arg
        organization_slug = options.get("organization")
        domain_slug = options.get("domain")
        print(
            "Creating the right files for {} & {}, stand by".format(
                organization_slug, domain_slug
            )
        )

        # load in fmgen file
        src = r"/home/django/fixtures/mappings/{}/{}/targets/fmgen.json".format(
            organization_slug, domain_slug
        )

        with open(src) as f:
            caceis_holdings_file = json.load(f)
            c_holdings_current_mapping = caceis_holdings_file["transformer"]["config"][
                "output"
            ][0]["data"].copy()

        ### MAPPING KEYS ###

        # caceis-holdings header names replacement key
        mapping_replace_key = {
            "ISIN code": "ISIN",
            "Sedol": "SEDOL",
            "Cusip": "CUSIP",
            "Bloomberg Ticker": "Ticker",
            "BR Asset ID": "External Identifier",
            "MV Local Excl. AI": "MV Local Clean",
            "AI Local": "Accrued Interest Local",
            "MV Base Excl. AI": "MV Base Clean",
            "AI Base": "Accrued Interest Base",
            "SecType": "Security Type",
            "Security name": "Security Name",
            "Benchmark/Portfolio": "Fund Identifier",
            "Leg": "Leg Number",
            "Country of issuer 2 letter": "Issuer Country",
            "Counterpart Country": "Parent Issuer Country",
            "Swap Type": "Security Subtype",
            "Pay/Rec": "Pay Receive Flag",
            "Counterparty": "Issuer Name",
            "Bank Account Type": "Security Subtype",
            "Number of units": "Number of Units",
            # add others as needed
        }
        # caceis-holdings final column shape
        target = [
            {"to": "ISIN"},
            {"to": "SEDOL"},
            {"to": "CUSIP"},
            {"to": "FIGI"},
            {"to": "Ticker"},
            {"to": "External Identifier"},
            {"to": "Number of Units"},
            {"to": "Local Currency"},
            {"to": "MV Local Clean"},
            {"to": "Accrued Interest Local"},
            {"to": "MV Local Incl. AI"},
            {"to": "Base Currency"},
            {"to": "MV Base Clean"},
            {"to": "Accrued Interest Base"},
            {"to": "MV Base Incl. AI"},
            {"to": "Country"},
            {"to": "Price Local"},
            {"to": "Price Base"},
            {"to": "Security Name"},
            {"to": "Security Type"},
            {"to": "Maturity Date"},
            {"to": "Coupon"},
            {"to": "Fund Identifier"},
            {"to": "Holdings Date"},
            {"to": "Leg Number"},
            {"to": "All Legs Present"},
            {"to": "Transaction Price"},
            {"to": "Currency Cross"},
            {"to": "Day Count Convention"},
            {"to": "Issuer Name"},
            {"to": "Issuer LEI"},
            {"to": "Issuer Country"},
            {"to": "Parent Issuer LEI"},
            {"to": "Parent Issuer Name"},
            {"to": "Parent Issuer Country"},
            {"to": "Issue Date"},
            {"to": "Security Subtype"},
            {"to": "Pay Receive Flag"},
            {"to": "Coupon Type Leg 1"},
            {"to": "Coupon Type Leg 2"},
            {"to": "Coupon From Date Leg 1"},
            {"to": "Coupon From Date Leg 2"},
            {"to": "First Coupon Date Leg 1"},
            {"to": "First Coupon Date Leg 2"},
            {"to": "Reference Rate Floating Leg 1"},
            {"to": "Reference Rate Floating Leg 2"},
            {"to": "Fixed Rate Leg 1"},
            {"to": "Fixed Rate Leg 2"},
            {"to": "Coupon Frequency Leg 1"},
            {"to": "Coupon Frequency Leg 2"},
            {"to": "Underlying Type Leg 1"},
            {"to": "Underlying Type Leg 2"},
            {"to": "Underlying Index Leg 1"},
            {"to": "Underlying Index Leg 2"},
            {"to": "Rate Inflation Swap"},
            {"to": "Underlying CUSIP"},
            {"to": "Underlying ISIN"},
            {"to": "CDS Underlying RED Code"},
            {"to": "CDS Reference Entity"},
            {"to": "Rating SP"},
            {"to": "Rating Moodys"},
            {"to": "Rating Fitch"},
            {"to": "Spread"},
            {"to": "Option Type"},
            {"to": "Option Exercise Style"},
            {"to": "Option Strike Price"},
            {"to": "Option Transaction Number"},
            {"to": "Swaption Underlying Fund Identifier"},
            {"to": "Swaption Underlying Security Type"},
            {"to": "Swaption Call or Put"},
            {"to": "Swaption Expiry Date"},
            {"to": "Swaption Reference Rate"},
            {"to": "Swaption Underlying Name"},
            {"to": "Swaption Underlying Maturity Date"},
            {"to": "Tick Size"},
            {"to": "Tick Value"},
            {"to": "Conversion Factor"},
            {"to": "ISIN Deliverable"},
            {"to": "CIC Code"},
        ]

        # update c_holdings_current_mapping to new naming scheme
        def map_value(input_key):
            if input_key in mapping_replace_key:
                return mapping_replace_key[input_key]

            return input_key

        for item in c_holdings_current_mapping:
            if "to" in item:
                item["to"] = map_value(item["to"])

        # replace old mapping with new mapping
        caceis_holdings_file["transformer"]["config"]["output"][0]["data"] = target

        # compares old fmgen with new caceis-holdings, if old had an entry, add entry to new
        for item in caceis_holdings_file["transformer"]["config"]["output"][0]["data"]:

            for item_f in c_holdings_current_mapping:
                if "to" in item_f:
                    if item["to"] == item_f["to"]:
                        if "from" in item_f:
                            item["from"] = item_f["from"]
                        if "format" in item_f:
                            item["format"] = item_f["format"]
                        if "map" in item_f:
                            item["map"] = item_f["map"]

        # update some naming stuff
        caceis_holdings_file["setup"]["targetDomain"] = "caceis-holdings"
        caceis_holdings_file["transformer"]["config"]["variables"][
            "filename"
        ] = "CACEIS-HOLDINGS_{shareClassIdentifier}_{isoDateTime}.csv"

        # nested_replace replaces one word with another
        caceis_holdings_file = nested_replace(
            caceis_holdings_file, "InstrLookup", "InstrLookupCode"
        )

        caceis_holdings_file = nested_replace(
            caceis_holdings_file, "cicSecType", "cicSecTypeCode"
        )

        # Add a hash of the current config to check if it was changed.
        caceis_holdings_file["hash"] = calculate_hash(caceis_holdings_file)

        # caceis-holdings file path
        dst = (
            r"/home/django/fixtures/mappings/{}/{}/targets/caceis-holdings.json".format(
                organization_slug, domain_slug
            )
        )

        # compares new hash with current caceis-holdings.json hash.
        if os.path.exists(dst):
            current_caceis_holdings = dst
            with open(current_caceis_holdings, "r") as cf:
                c_c_holdings = json.load(cf)

            # calculate hash existing caceis_holdings_file
            hash_test_current = calculate_hash(c_c_holdings)
            hash_test_new = calculate_hash(caceis_holdings_file)

            # if equal abandon script
            if hash_test_current == hash_test_new:
                sys.exit("target file up to date, stopping script")

            # if not equal ask if you want to see the difference
            if hash_test_current != hash_test_new:
                answer = input(
                    "Differences detected between the new and current caceis-holdings file. Check what will be changed? [y/n]: "
                )
                if answer == "y":  # look at diffs
                    print(
                        diff(
                            c_c_holdings["transformer"]["config"]["output"][0]["data"],
                            caceis_holdings_file["transformer"]["config"]["output"][0][
                                "data"
                            ],
                        )
                    )
                if answer == "n":  # continue
                    pass

                overwrite_file = input("want to overwrite the file? [y/n]: ")
                if overwrite_file == "n":  # update hash in current file, exit
                    sys.exit("Not overwriting, stopping script.")
                if overwrite_file == "y":  # continue script
                    pass

        else:
            pass

        # return updated file to location

        with open(dst, "w") as xz:
            json.dump(caceis_holdings_file, xz, indent=3)

        ### CONFIG FILE ACTION STARTS HERE ###

        # opening right file, adding it to var to update
        config_file = r"/home/django/fixtures/mappings/{}/{}/config.json".format(
            organization_slug, domain_slug
        )

        with open(config_file, "r") as c:
            config_full = json.load(c)

        # make a copy if there is an InstrLookuplist
        try:
            instr_lookup_code = config_full["lists"]["InstrLookup"].copy()
        except KeyError:
            sys.exit("caceis-holdings update for {} complete!".format(domain_slug))

        # mapping key for 'InstrLookup' to 'InstrLookupNew'
        config_mapping_key = {
            "1": "Fixed Income",
            "2": "Equity",
            "3": "Cash",
            "4": "Future",
            "5": "FX Forward",
            "6": "Option",
            "7": "SWAPS",
            "8": "CDS",
            "9": "Loan",
            "10": "Warrants",
            "11": "Municipal",
            "12": "US Pool",
            "13": "CP/CD",
            "14": "Repo",
            "15": "TBA",
            "16": "Time Deposit",
            "17": "FX Option",
            "18": "Swaption",
        }

        # function that looks up keys in config_mapping_key
        def config_map_value(input_key):
            input_key = str(input_key)
            if input_key in config_mapping_key:
                return config_mapping_key[input_key]
            return input_key

        # loop through keys & replace values from config_mapping_key
        for item in instr_lookup_code:
            instr_lookup_code[item] = config_map_value(instr_lookup_code[item])

        # add _new to config_full under lists
        config_full["lists"]["InstrLookupCode"] = instr_lookup_code

        with open(config_file, "w") as cf:
            json.dump(config_full, cf, indent=2)

        # happy prints
        print("caceis-holdings & config update {} complete!".format(domain_slug))
        print("(づ￣ ³￣)づ")
