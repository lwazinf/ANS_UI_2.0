![Arweave Logo](/public/ProfileHUD/ar_logo.png)
# Component Submission Brief
## Structure
![Structure](/public/ProfileHUD/MD_Assets/structure.png)
The main component is a Heads Up Display styled banner that allows users to access information with relative ease.

The information is not limited to the API itself, but adds the potential of integration with other services/products within the Arweave ecosystem. (ie. ArDrive, Arweave.News)

Below the main component, are Secondary Components that expand on the information available on the main HUD component.

> Instead of viewing static images as I explain functionality, please feel free to test the components, using [Xylophone's profile](https://lwazinf.com/p/xy) as an example, on the live demonstration.

## Main Component
##### **[Top Half - HUD]**
1. The user's details are clearly displayed for anyone to view and understand, even at a glance. 
2. A deeper look into the user's possible interactions on this component, Arweave's logo [top left] takes users to ArWiki.
3. In the center of everything is the user's display photo. (clicking on it exposes the user's respective QRCode, for easy discovery/sharing if needed.) On the left of the square are social media links and on the right are both the Label and Bio of the user. (Verification indicator included)
4. The lower half carries important controls for accessing information not readily available on the HUD itself.. these controls either integrate external ecosystem services or controls a secondary function of the app as a whole.

##### *[3] ..this area also diplays user stamps (click on stamp icon [bottom right] to access this function)*
##### *[4] From left to right we find Analytics/NFTs, Arweave Updates, ArDrive Feature File (user uploaded file, extends profile beyond ar.page), Detail Area and Stamps.. respectively*

## Secondary Components
##### **[Bottom Half - Dashboard]**
> ##### Two parts make the dashboard: *Analytics (1) & NFTs (2)*
1. [Left Plate] Dynamic element, unique for each user, depending on their use of Arweave's Blockchain. Not just "eye candy", this area shares a perspective beyond those traditionally used on web applications.
2. [Right Plate] User assets in a familiar grid arrangement. 
##### *[Analytics] Area needs a bit more work, as bubble chart doesn't redraw itself when selecting a different category. This slightly removes from the goal of the area, but a problem not beyond solving.*
##### *[NFTs] The selected NFT is displayed on the Left Plate (minimized). That element has its own simple funtionality*

#

## Areas Of Improvement
```javascript
AOI = [
    {
        area: "HUD",
        entry: "Click on second icon from the bottom left to access Arweave news, no response",
        description: "Tried scrapping data from the Arweave.News, using python, failed.. turning to Twitter as an alternative, I received a CORS error as this is API related. Can't display response data",
    },
    {
        area: "HUD",
        entry: "Click on first icon from the bottom right to access the user's stamps, under developed UI",
        description: "UI can be improved, not much to work with nor is there good/interesting/meaningful interactivity.. TIMESTAMP also an issue: Year not converting.",
    },
    {
        area: "HUD",
        entry: "Click on third icon from the bottom left to access the user's ArDrive (feature) file, empty",
        description: "This isn't really a problem but rather a function which hasn't been implemented yet.",
    },
    {
        area: "Dashboard",
        entry: "Selecting a bubble or changing the category, non responsive.",
        description: "Doesn't change dynamically, Pie chart is reponsive though.",
    },
    {
        area: "Dashboard",
        entry: "Access Analytics",
        description: "Turning the bubbles into Arweave logos could be great for branding purposes.",
    },
    {
        area: "OVERALL",
        entry: "Acces application using a mobile device, not responsive",
        description: "The application is great for Desktop consumption, just need to make it mobile friendly",
    },
]
```