<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/uier/hackbar">
    <img src="src/assets/img/icon-128.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">hackbar</h3>
  <p align="center">
    A browser extension for using kbar in HackMD
    <br />
    <a href="https://github.com/uier/hackbar/issues">Report Bug / Request Feature</a>
  </p>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Features](#features)
  - [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Shortcuts](#shortcuts)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

hackbar provides a kbar component to use in HackMD.

### Features

-   Create empty note or create from templates.
-   Search & Open notes by title / tags / teams.
-   Switch between workspaces (teams).
-   Shortcuts for creating note and switching team.

![](demo/hackbar-demo.gif)

### Built With

-   [React.js](https://reactjs.org/)
-   [kbar](https://kbar.vercel.app/)
-   [lxieyang/chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

-   [Chrome extension (chrome web store)](https://chrome.google.com/webstore/detail/hackbar/algbkiepdpcjnhgagoddfcicdeaiimba)
-   Firefox add-on (WIP)
-   Manually download and locally load to your browser (WIP)

## Usage

### Basic

-   Press <kbd>⌘</kbd>+<kbd>k</kbd> (Mac) / <kbd>Ctrl</kbd>+<kbd>k</kbd> (Windows & Linux) to open kbar.
-   Directly search things. Open note by title/tag, create note from template, team name.

### Shortcuts

-   Press <kbd>+</kbd> to navigate to note creating view.
-   Press <kbd>@</kbd> to navigate to team switching view.
-   Shortcuts also work when kbar is closed.

For more detail, please refer to the [Documentation on HackMD](https://hackmd.io/@uier/hackbar).

<p align="right">(<a href="#top">back to top</a>)</p>

## Development

1. Clone the repo
    ```sh
    git clone https://github.com/uier/hackbar.git
    cd hackbar
    ```
2. Install dependencies
    ```sh
    pnpm i
    ```
3. Build extension in `build/`
    ```sh
    pnpm prepare
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

-   [ ] Search & Open notes in specific team (such as GitHub)
-   [ ] Create note in specific team

See the [open issues](https://github.com/uier/hackbar/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/amazing-feature`)
3. Commit your Changes with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
4. Push to the Branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

TzuWei Yu (uier) - ap9940506@gmail.com

Project Link: [https://github.com/uier/hackbar](https://github.com/uier/hackbar)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/uier/hackbar.svg?style=for-the-badge
[contributors-url]: https://github.com/uier/hackbar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/uier/hackbar.svg?style=for-the-badge
[forks-url]: https://github.com/uier/hackbar/network/members
[stars-shield]: https://img.shields.io/github/stars/uier/hackbar.svg?style=for-the-badge
[stars-url]: https://github.com/uier/hackbar/stargazers
[issues-shield]: https://img.shields.io/github/issues/uier/hackbar.svg?style=for-the-badge
[issues-url]: https://github.com/uier/hackbar/issues
[license-shield]: https://img.shields.io/github/license/uier/hackbar.svg?style=for-the-badge
[license-url]: https://github.com/uier/hackbar/blob/master/LICENSE
