
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
To create a new account, a username and password must be informed for registration, then a display name must be informed to finish registration.

https://user-images.githubusercontent.com/42102027/175791823-77abcb9f-b98e-4a93-a2ea-3fb11a4725e2.mp4

After registration or login, a token sent by the API will be stored locally, every time the users re-open the app this token will be automatically validated, so the user won't need to log in again.

#### Feed

The feed works with a React Native Swiper component that dynamically changes when a new request is made to the API, which returns a random publication. Every time the user swipes right, a new random publication that he has not yet seen will be shown. It is possible to favorite the quotes, comment on them and visit the profile of the users who posted them.

https://user-images.githubusercontent.com/42102027/175791840-f54406c6-3a76-4ae2-9b2e-a2da6ee88c4b.mp4

The user can visit the profile of other users and follow them, by doing that, it is possible to keep track of quotes posted by the followed users in the feed.

https://user-images.githubusercontent.com/42102027/175791851-37cc5872-4438-4b3c-84ff-1ab9aebe7385.mp4

#### Posting a quote

Posting a quote is simple, it can be done in the home page by clicking in the plus sign at the bottom bar. The user can write the quote and optionally inform the author of the quote. The publication can be edited, deleted and pinned in the user's profile.

https://user-images.githubusercontent.com/42102027/175791881-2356a0f2-c71a-48c8-b397-506e818ca9b6.mp4

#### Commentaries

One of the core features of the application is to comment on other people publications, share opinions about quotes and thoughts. It is also possible to favorites commentaries from other users.

https://user-images.githubusercontent.com/42102027/175791888-e5b5c6af-3281-4282-bbe4-dd52e195407f.mp4

#### Profile

The users can visit their profile to see their publications, commentaries, favorites, followers and following users. If a publication is pinned, it will be displayed in there.

https://user-images.githubusercontent.com/42102027/175791895-802f3830-bd56-47a0-9bed-5f04c04772e3.mp4

#### Settings

In the settings screen, it is possible to change the password and change the display name.

https://user-images.githubusercontent.com/42102027/175791899-ddfd1bac-49d8-487d-ac3f-1e8f96f1bdc4.mp4

#### Admin Functionalities

The administrators have a few privileges, they can edit or delete any publication / commentary, edit users data like name, username and password, and can also ban them. Once a user is banned, their profile can be visited, but their publications and commentaries will not be displayed anymore, and they can no longer access their account.

https://user-images.githubusercontent.com/42102027/175791908-453cd42b-ef39-43ac-a5b8-200e4d00555e.mp4

## Points to improve

- E-mail verification;
- Notifications;
- ...

## Compatibility

The application works on Android, it was not yet tested on iOS.

## Download

The application was not published in an app store, but you can try it by downloading an .apk for Android and installing it. This version is for demo only, but all features work normally.

[Click here](https://github.com/GabrielN11/quoting-app/releases/tag/quotingv0.9-beta.1 "Click here") to download the latest release.


