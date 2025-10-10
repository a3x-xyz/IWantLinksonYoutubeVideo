<p align="center">
  <img src="https://raw.githubusercontent.com/a3x-xyz/IWantLinksonYoutubeVideo/refs/heads/main/main.png" alt="I Want Links on YouTube Video Logo" width="200">
</p>

<h1 align="center"><b>I Want Links on YouTube Video</b></h1>

**I Want Links on YouTube Video** is a free and open-source browser extension that reads YouTube video data through a JSON URL.  
If the video exists in the JSON source, you’ll see the link directly in the extension.

---

### What is it?

This extension reads information about YouTube videos from a JSON URL source.  
It’s designed to quickly show whether a YouTube video has an associated link entry in that JSON file — without needing to manually open the video description.

---

### How does it work?

Once installed, simply open a YouTube video.  
The extension checks the JSON URL source for that video and displays the result:

- If the video is found in the JSON source, you’ll see its link.  
- If not, the extension will show that no link exists.  
- Everything is accessible directly from the popup interface.  

---

### Screenshot

<p align="center">
  <img src="https://raw.githubusercontent.com/a3x-xyz/IWantLinksonYoutubeVideo/refs/heads/main/screenshot.png" alt="Screenshot">
</p>
<p>Video on YouTube, link exists in the JSON URL.</p>
<br>
<p align="center">
  <img src="https://raw.githubusercontent.com/a3x-xyz/IWantLinksonYoutubeVideo/refs/heads/main/screenshot1.png" alt="Screenshot">
</p>
<p>Video on YouTube, but link doesn’t exist in the JSON URL.</p>

---

### Message Meanings

The extension may show different messages based on the current page or video status:

| Message | Meaning |
|----------|----------|
| **You're not visiting YouTube!** | The extension only works on YouTube. Open a YouTube video page to use it. |
| **No found video.** | No video was detected on the current YouTube page, or if a video exists, the link didn’t exist in the JSON URL source. |
| **Found video!** | The video exists and its link was found in the JSON URL source. |

---

### License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.  
You are free to use, modify, and redistribute this software under the same license.  
See the [LICENSE](./LICENSE) file for details.

---

### Donate
If you'd like to support the project, please visit:  
https://a3x.xyz/donate
