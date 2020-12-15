## XKCD app


Assignment:

    Use the API described at https://xkcd.com/json.html
    It should be able to show thumbnails for all strips (but not necessarily show all at exactly the same time)

    You should be able to explore each strip more closely in some way
    Use reusable components
    Build your software in such a way that you and your colleagues can build on it and maintain it for a long time to come
    Deploy this some place of your choice or describe how you would do so


Why?
There's probably an avid nerd reader in the compapny (Dan?).

Requirements:

- Maintainability
- Master / detail view?
- Show thumnails
  
  - What are thumbnails?
    - It's responsible for the first impression of web content. 
    - It's a compressed preview image of the original that is used as a placeholder.
  
  - Why use thumbnails?
    - Space savers
    - User-friendliness, making sure that users can easily navigate.
    - Interactivity.

  - What makes a good thumbnail for XKCD?
    - Hmm...
    - Title?
- Deploy
  There needs to run a script every day that checks for new content.
  If so -> rebuild
  




1) Make a design sprint
   
   - Reddit??
   - Ask for how they would like to envision it.
    
   - How I envision it could be:
     - Massive grid and you can just pinch and zoom through them (cool mobile experience), d3js
     - Or like a side scrolller, where you can click and drag a bottom slider

2) Create a user profile (Dan)
3) Speed optimizations:
    - Make it a static site, pre-rendered.
    - Cron job that runs the site every day with latest content.
    - Preloading the next 5 and previous 5 images.
    - Images -> webp and smaller for mobile etc.

4) Keyword search
    - Just on title? or other stuff?

5) xkcd styled chart lib
   - LOL
   
6) Difficult images: Click and drag - 1 gif
7) Tilt - overwhelmed by the sheer size of the community