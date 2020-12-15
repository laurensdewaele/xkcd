# Problem

I need every comic and all the data.
The api is not ideal. 
It only gives me the current comic and then i need to manually specify
which comic I want.

http://xkcd.com/info.0.json (current comic)
http://xkcd.com/614/info.0.json (comic #614)

# What does it need to do?

- I want one big JSON object with all data inside, that's easier to process.

# Solution

- Grab the current comic
- Check which no. we're on.
- Check which nos don't exist in our big json file.
- If some aren't in there -> add them.