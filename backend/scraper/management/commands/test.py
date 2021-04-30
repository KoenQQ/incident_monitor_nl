from django.core.management.base import BaseCommand, CommandError




class Command(BaseCommand):
    """custom commandline command that scrapes
        title, description and more from livep2000 and pushes
        it to PostgreSQL db
        """
    help = "command to test out functions"

    def add_arguments(self, parser):
        parser.add_argument(
            "--input",
            action="store",
            dest="input",
            default="all",
            help="input number, should return transformed number",
        )


    # define logic of command
    def handle(self, *args, **options):

        search_range = options.get("input")
        search_range = int(search_range)

        distance_key = {
        0.5: 0.0045,
        1: 0.009,
        1.5: 0.0135,
        2: 0.018,
        2.5: 0.0225,
        3: 0.027,
        3.5: 0.0315,
        4: 0.036,
        4.5: 0.0405,
        5: 0.045,
        5.5: 0.0495,
        6: 0.054,
        6.5: 0.0585,
        7: 0.063,
        7.5: 0.0675,
        8: 0.072,
        8.5: 0.0765,
        9: 0.081,
        9.5: 0.0855,
        10: 0.09
        }

        def return_degrees(e):
            km = e
            degrees_range =[]
            for kilometers, degrees in distance_key.items():
                if kilometers == km:
                    degrees_range = degrees
            return degrees_range

        return_item = return_degrees(search_range)
       
        print(return_item)
        # return (return_item)