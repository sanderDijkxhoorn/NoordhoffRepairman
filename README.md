# Noordhoff Repairman

A Google Chrome extension that automatically fills in answers for online homework of subjects published by Noordhoff Uitgevers.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15117158/144047783-00b2ea8e-75f0-40dd-96db-72ef24d645a8.png">
</p>

# About

TechnologicNick:
I wrote this somewhere in my first year of highschool. It was still a userscript and was able to fill in answers for the subjects Dutch, French, German and mathematics. In the third year I turned it into a Chrome extension. Noordhoff Uitgevers then released their new online homework platform, Digilino. I made the extension fill in the answers for the new platform too, which added science to the list of subjects.

sanderDijkxhoorn:
I am currently writing a version for the latest Noordhoff assignments.

# Current state

- Assigments using Digilino should still work.
- Text entry questions automatically fill in if there is only one page per question. (You have to make a little change to each answer to make it detect you filled in an answer. Still working on a bypass.)
- There are other assignments where it could grab the answers from but they are currently only logged inside of the console.

# Installation

1. Clone this repository or click here -> (<a href="https://github.com/sanderDijkxhoorn/NoordhoffRepairman/archive/refs/heads/main.zip" target="_blank">master.zip</a>)
2. Enable developer mode. Chrome: [chrome://extensions/](chrome://extensions/) Brave: [brave://extensions/](brave://extensions/)
3. Click "Load unpacked" and select the folder you cloned the repository to. (if you are using the master.zip make sure to unzip it first)

# Usage

1. Click on the extension icon
2. Change the settings
3. Start an exercise
4. Enjoy
