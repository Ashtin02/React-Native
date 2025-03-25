# FlipFocus

## Description
FlipFocus is a local flashcard application that allows you to store and manage hundreds of decks on your device. Designed for on-the-go studying, it provides an intuitive way to create, view, and study flashcards at your convenience!

## Features
- **Local Storage:** Save and access all your decks without needing an internet connection.
- **Deck Management:** Create, edit, and delete decks with ease.
- **Flashcard Review:** Study flashcards in an interactive and engaging way.
- **Flip Animation:** Enjoy a smooth and realistic flipping animation that enhances the flashcard experience.
- **Progress Tracking:** Keep track of how many cards you got correct in each deck.
- **User-Friendly Interface:** Simple and efficient design to enhance your study sessions.

Whether you're preparing for exams, learning a new language, or just want to memorize key concepts, FlipFocus is the perfect tool to support your learning process.

## Team Member Individual Contribution
- **Anthony:** 
    - [ contributions ]
- **Petar:** 
    - Created login.tsx page
    - Created register.tsx page
    - Login test
- **Max:**
    - Implemented a side drawer for better page routing
    - Created AddButton.tsx, CustomDrawer.tsx, DashboardDecks.tsx and SearchBar.tsx components
    - Created the skeleton, and fleshed out the dashboard
    - Created the logic behind addFlashcard.tsx, and addToDeck.tsx
    - Implemented ESLint into our project
    - Created testing for addToDeck
    - Utilized docs from react-router to create dynamic routing for when a user is logged in vs. not
    - Set up _layout.tsx so that every screen has proper naming screen/drawer is set up properly
- **Ashtin:** 
    - Configured Jest for testing
    - Created Flashcard.tsx component
    - Flashcard tests
    - Helped implement the deck creation feature
    - Added flashcard flip animation 
    - Created deck.tsx and index.tsx page
    - Worked on AsyncStorage logic


## Edits from Original Design
- **Data Storage Changes:** 
     - Originally planned to use a database like SQLite, but due to time constraints from the CodeDay project, we pivoted to an offline app using AsyncStorage.
     - While this may be a simplier approach it was something that was realistic with the new time frame we had and also introduced offline functionality so we chose this path. 
- **Design Changes:** 
    - Decided to pivot from an online app to a more reliable offline app accessible with or without internet connection.
    - Drawer was changed from it's original design since we were no longer going to use a database so there was no reason to have "Search Decks", profile pictures, etc... since users are mocked
    - Added some new UI components, like react natives Animated API for animations.
    - The actual login and register page will not match the design because the functionality of my code
      for those pages is not compatible with what my team has.  


- **Feature Changes:** 
    - The original plan included deck sharing, but since we moved to an offline model with AsyncStorage, this feature was removed.
    - Future versions could reintroduce online sharing by integrating a database.


## Future Improvements

**Data Storage:** 
- If we want to reintroduce deck sharing, we’ll need to implement a backend database such as Firebase or SQLite.
- Requires an internet connection causing the app to shift from offline to an online system

**Additional Feature Ideas:**
- Quiz Mode: add a game like feature to quiz you. (MC questions, fill in the blank, etc.)
- Import/Export Decks: give users the option to import ot export decks in a JSON format 
- Dark Mode: Give users the option to change color theme from light to dark

**Wireframes Design**
<img width="912" alt="Screenshot 2025-03-24 at 5 09 25 PM" src="https://github.com/user-attachments/assets/59487263-7e50-4f92-a9c3-be63944a7ef0" />

