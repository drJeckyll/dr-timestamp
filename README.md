# THIS CODE IS OBSOLETE AND WILL NOT BE UPDATED ANYMORE
Please use new repo here: https://git.jeckyll.net/published/personal/dr-timestamp


# dr-timestamp
Firefox extenstion which convert epoch datetime to normal date format and vice versa and decode timestamp directly from selected timestamp in web page page.

Since my beloving TimeStamp Converter addon is dead I'm in searching for a replacement. And because I'm lazy to look at too many results which addons.mozilla.org is keen to represent (1 649 results for „unix timestamp“) I decide to combine two of them.

So all credits to:
Harsh Karn- Author of Epoch Converter (ver. 2.0.1) - https://addons.mozilla.org/bg/firefox/addon/epochconverter/
noir04 - Author of Timestamp Decoder (ver. 0.0.3) - https://addons.mozilla.org/bg/firefox/addon/timestamp-decoder/

Very little original work here.

* Added option for YYYY/MM/DD format
* Auto focus input when popup open

TODO
* Use extension popup for decoding timestamps instead of alert() message

HOWTO INSTALL

Method 1. From releases link on top of the page
* select latest xpi and install like every other extension

Method 2: From current sourse
* clone this repo
* zip contents (only contents, no parent folder) into single zip file
* drag and drop zip file into Firefox addons page
* confirm all warings
* done
