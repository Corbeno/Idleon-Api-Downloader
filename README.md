# Idleon-Api-Downloader

A Chrome extension that allows for the downloading of API data in JSON format sent to the browser when Idleon is loaded. Short are the days of manually inputting your character's data into a spreadsheet.

# How to get

1. Download the repository by clicking the green Code button on this page then click "Download ZIP"
2. Unzip the file to your location of choice (download folder works fine)
3. Navigate to chrome://extensions in chrome browser
4. Make sure "Developer mode" is checked at the top right of the screen
5. Click "Load unpacked" then select the folder you unzipped
6. You are good to go! You might want to pin the extension for ease of use in game

Please note that I plan on making this extension available on the chrome web store.

# How to use

The extension is really easy to use once it is installed. Simply navigate to the legends of Idleon website (in Chrome of course) and click play. Once you are on the character selection screen you should be able to open the extension and a series of download/copy links should appear. Enjoy!

The best use of this extension is the ability to copy data that can be easily pasted into the Idleon Calculator import spreadsheet. Doing so will allow you to min/max each of your character and view information the game normally doesn't give you. The spreadsheet is very powerful!

Upon viewing the JSON data, it might seem really messy in a text editor. That is because it is unformatted. Just paste the data into a JSON viewer such as http://jsonviewer.stack.hu/ and it makes viewing the data much easier.

# How does it work?

Idleon sends all of its game data to your browser as an XMLHttpRequest (XHR for short). The extension takes advantage of that and views the requests just like the game would but instead lets the player see all the data at once.

# How do people use this?

The raw JSON data is really messy and many things about the save data isn't very clear. Things aren't named consistently and there is a lot of extra "JSON" formatting that is unnecessary. I have written scripts to turn this messy data into a "clean" csv, but I also included the original save data in case you want to make your own! If you want to make tools that take advantage of the "clean" JSON, please be warned that it might change in the future as Idleon updates and things need to be re-organized.

# I'm having issues!

Whether you are trying to use the extension to paste into a spreadsheet or creating a whole new tool for people to use, if you are running into any issues please feel free to reach out to me on the official Idleon discord. I appreciate people who find bugs!

You can also create an issue right here in Github if you like. Simply create a new issue in the "issues" tab at the top of this page!

If you are having issues directly following an update to Idleon, chances are that I'm already working on the fix. Please be patient, but still feel free to message me or create a Github issue if you would like!

# "How can I help?"

I put this project on Github for a reason! This is my first project with web development, so things are pretty sloppy in that area. If you think you can contribute in any way, please feel free to make a pull request! It would be much appreciated!

I'm really bad with HTML/CSS, so if anybody wants to make the popup window (index.html) nice looking I would really appreciate it.
