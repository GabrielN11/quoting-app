
<img src="https://user-images.githubusercontent.com/42102027/177230396-91ded39b-e5fd-4018-bfd0-daae89793655.png" alt="drawing" width="200"/>

# Quoting

Quoting is a social media application made with the aim of users sharing quotes and thoughts. The users can see other people quotes through a feed that dynamically shows random posts from other users. It is possible to comment on publications, favorite them and follow other users.

## Technologies used

- React Native
- Expo
- Styled Components
- React Native Swiper
- React Navigation
- Font Awesome
- unDraw svg images

Check the API repository and README [clicking here](https://github.com/GabrielN11/quoting-api "clicking here").

## Showcase

#### Initial Page

The landing page of the app is a slide presenting the app to the users. The user can create a new account or sign in an already existing account.
To create a new account, a username, email and password must be informed for registration. An e-mail will be sent with a validation code to authenticate the account, the code must be informed in the request field to proceed with the registration. After that, a display name must be informed to finish registration.

https://user-images.githubusercontent.com/42102027/180006226-79276bb0-eb81-41d7-95af-246a834b21a2.mp4

After registration or login, a token sent by the API will be stored locally, every time the users re-open the app this token will be automatically validated, so the user won't need to log in again.

#### Feed

The feed works with a React Native Swiper component that dynamically changes when a new request is made to the API, which returns a random publication. Every time the user swipes right, a new random publication that he has not yet seen will be shown. It is possible to favorite the quotes, comment on them and visit the profile of the users who posted them. It is also possible do see quotes from a specific category.

https://user-images.githubusercontent.com/42102027/180007097-12d07310-2fc4-4540-ace1-78b5b7364ede.mp4

The user can visit the profile of other users and follow them, by doing that, it is possible to keep track of quotes posted by the followed users in the feed.

https://user-images.githubusercontent.com/42102027/180007602-73f29f80-a084-4979-aa24-84d5a0d9da98.mp4

#### Posting a quote

Posting a quote is simple, it can be done in the home page by clicking in the plus sign at the bottom bar. The user can write the quote, choose a category and optionally inform the author of the quote. The publication can be edited, deleted and pinned in the user's profile.

https://user-images.githubusercontent.com/42102027/180008594-324fe808-a6b9-4d2a-99c7-45858afbab65.mp4

#### Commentaries

One of the core features of the application is to comment on other people publications, share opinions about quotes and thoughts. It is also possible to favorites commentaries from other users.

https://user-images.githubusercontent.com/42102027/180009431-c02a181c-4de7-40b8-9cf0-5df9a4c9083f.mp4

#### Profile

The users can visit their profile to see their publications, commentaries, favorites, followers and following users. If a publication is pinned, it will be displayed in there.

https://user-images.githubusercontent.com/42102027/180009514-3ccc1321-34a7-4a39-b94b-b44cb1b6c913.mp4

#### Settings

In the Settings screen, it is possible to change the password, display name and visit the activity history.

https://user-images.githubusercontent.com/42102027/180009889-a672b711-6ee9-4dd6-8d76-8aef68be7521.mp4

#### Search

In the Search screen, it is possible to search for citations, filtering from the text and author. It is also possible to search for other users.

https://user-images.githubusercontent.com/42102027/180011597-90076ae5-7719-4629-b532-65b5a38bf539.mp4

#### Admin Functionalities

The administrators have a few privileges, they can edit or delete any publication / commentary, edit users data like name, username and password, and can also ban them. Once a user is banned, their profile can be visited, but their publications and commentaries will not be displayed anymore, and they can no longer access their account. The administrator can also manage the reports and categories.

https://user-images.githubusercontent.com/42102027/180010248-bb499ee1-ddae-4a7d-a2a4-86bf79b304ac.mp4

## Points to improve

- Notifications;
- ...

## Compatibility

The application works on Android, it was not yet tested on iOS.

## Updates

Check the [releases](https://github.com/GabrielN11/quoting-app/tags "releases") to check the newest updates and features.

## Download

The application was not published in an app store, but you can try it by downloading an .apk for Android and installing it. This version is for demo only, but all features work normally.

[Click here](https://github.com/GabrielN11/quoting-app/releases/tag/quotingv0.9-beta.3 "Click here") to download the latest release.


