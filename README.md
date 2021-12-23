<div id="top"></div>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<br />
<div align="center">
  <a href="https://github.com/Uier/hackbar">
    <img src="src/assets/img/../../../build/icon-128.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Hackbar</h3>

  <p align="center">
    A browser extension for using kbar in HackMD
    <br />
    <a href="https://github.com/Uier/hackbar/issues">Report Bug</a>
    ·
    <a href="https://github.com/Uier/hackbar/issues">Request Feature</a>
  </p>
</div>


## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Usage](#usage)
  - [Basic](#basic)
  - [Shortcuts](#shortcuts)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## About The Project

![Product Name Screen Shot][product-screenshot]

Hackbar provides a [kbar component](https://kbar.vercel.app/) to use in HackMD.

Features:
- Search notes, teams, tags, templates.
- Create empty note or from templates.
- Switch between workspaces (teams).
- Open recent or searched notes directly.
- Shortcuts for creating note and switching team.

![demo-new-note](demo/hackbar-new-note.gif)
![demo-switch-team](demo/hackbar-switch-team.gif)
![demo-search](demo/hackbar-search.gif)


### Built With

* [React.js](https://reactjs.org/)
* [lxieyang/chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)

<p align="right">(<a href="#top">back to top</a>)</p>


## Usage

### Basic

- Press <kbd>⌘</kbd>+<kbd>k</kbd> / <kbd>Ctrl</kbd>+<kbd>k</kbd> to open kbar.
- Directly search things. Open note by title/tag, create note from template, team name.

### Shortcuts

- Press <kbd>+</kbd> to navigate to note creating view.
- Press <kbd>@</kbd> to navigate to team switching view.
- Shortcuts also work when kbar is closed.

For more detail, please refer to the [Documentation on HackMD](https://hackmd.io/@uier/hackbar).

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

### Installation

- [Chrome extension download (not ready)](#installation)
- [Firefox add-on download (not ready)](#installation)

### Development

1. Clone the repo
   ```sh
   git clone https://github.com/Uier/hackbar.git
   cd hackbar
   ```
2. Run dev server
   ```sh
   yarn start
   ```
3. Build production
   ```sh
   yarn build
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Roadmap

- [] Search & Open notes in specific team (such as GitHub)
- [] Create note in specific team

See the [open issues](https://github.com/Uier/hackbar/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

TzuWei Yu (Uier) - ap9940506@gmail.com

Project Link: [https://github.com/Uier/hackbar](https://github.com/Uier/hackbar)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Uier/hackbar.svg?style=for-the-badge
[contributors-url]: https://github.com/Uier/hackbar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Uier/hackbar.svg?style=for-the-badge
[forks-url]: https://github.com/Uier/hackbar/network/members
[stars-shield]: https://img.shields.io/github/stars/Uier/hackbar.svg?style=for-the-badge
[stars-url]: https://github.com/Uier/hackbar/stargazers
[issues-shield]: https://img.shields.io/github/issues/Uier/hackbar.svg?style=for-the-badge
[issues-url]: https://github.com/Uier/hackbar/issues
[license-shield]: https://img.shields.io/github/license/Uier/hackbar.svg?style=for-the-badge
[license-url]: https://github.com/Uier/hackbar/blob/master/LICENSE
[product-screenshot]: demo/screenshot.png