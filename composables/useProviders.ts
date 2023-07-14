
interface Tag {
    id: number;
    imgSrc: string;
    text: string;
}

export const useProviders = () => {
    const providers = ref([
        {
            name: "SpaceX",
            url: "https://www.spacex.com",
            logo: "/logos/SpaceX_logo_black.svg",
            twitter: "https://twitter.com/SpaceX",
            youtube: "https://www.youtube.com/spacex"
        },
        {
            name: "Arianespace",
            url: "https://www.arianespace.com",
            logo: "/logos/arianespace-vector-logo.svg",
            twitter: "https://twitter.com/Arianespace",
            youtube: "https://www.youtube.com/@arianespace/featured"
        },
        {
            name: "United Launch Alliance (ULA)",
            url: "https://www.ulalaunch.com",
            logo: "/logos/ula.svg",
            twitter: "https://twitter.com/ulalaunch",
            youtube: "https://www.youtube.com/@unitedlaunchalliance/featured"
        },
        {
            name: "Roscosmos",
            url: "https://en.roscosmos.ru",
            logo: "/logos/roscosmos.svg.png",
            twitter: "https://twitter.com/roscosmos",
            youtube: "https://www.youtube.com/@tvroscosmos"
        },
        {
            name: "Virgin Galactic",
            url: "https://www.virgingalactic.com",
            logo: "/logos/virgingalactic.png",
            twitter: "https://twitter.com/virgingalactic",
            youtube: "https://www.youtube.com/@VirginGalactic/streams"
        },
        {
            name: "Rocket Lab",
            url: "https://www.rocketlabusa.com",
            logo: "/logos/rocketlab.svg.png",
            twitter: "https://twitter.com/RocketLab",
            youtube: "https://www.youtube.com/@RocketLabNZ"
        },
        {
            name: "PLD Space",
            url: "https://pldspace.com/es/",
            logo: "/logos/pldspace.png",
            twitter: "https://twitter.com/PLD_Space",
            youtube: "https://www.youtube.com/@PLDSPACE"
        },
        {
            name: "Firefly",
            url: "https://fireflyspace.com",
            logo: "/logos/firefly.png",
            twitter: "https://twitter.com/Firefly_Space",
            youtube: "https://www.youtube.com/@FireflySpace"
        },
        {
            name: "ISRO",
            url: "https://www.isro.gov.in",
            logo: "/logos/ISRO.svg.png",
            twitter: "https://twitter.com/isro",
            youtube: "https://www.youtube.com/@isroofficial5866"
        },
        {
            name: "Blue Origin",
            url: "https://www.blueorigin.com",
            logo: "/logos/BlueOrigin.png",
            twitter: "https://twitter.com/blueorigin",
            youtube: "https://www.youtube.com/@blueorigin"
        },
        {
            name: "JAXA",
            url: "https://global.jaxa.jp",
            logo: "/logos/JAXA.png",
            twitter: "https://twitter.com/JAXA_en",
            youtube: "https://www.youtube.com/@JAXA-HQ"
        },
        {
            name: "Aevum",
            url: "https://www.aevumspace.com/space",
            logo: "/logos/aevum.png",
            twitter: "https://twitter.com/aevumspace",
            youtube: "https://www.youtube.com/@aevum1377"
        }
    ]);

    const tagMapArray: Tag[] = [
        { id: 8, imgSrc: "/images/rocketIcon/33.svg", text: "Classified Payload 🤫" },
        { id: 9, imgSrc: "/images/rocketIcon/8.svg", text: "Crewed" },
        { id: 25, imgSrc: "/images/rocketIcon/34.svg", text: "Earth Observation Satellite" },
        { id: 45, imgSrc: "/images/rocketIcon/32.svg", text: "Meteorology" },
        { id: 53, imgSrc: "/images/rocketIcon/unconfirmed.svg", text: 'Unconfirmed Payload'},
        { id: 54, imgSrc: "/images/rocketIcon/14.svg", text: 'Lunar Lander'},
        { id: 55, imgSrc: "/images/rocketIcon/21.svg", text: 'Lunar Rover'},
        { id: 68, imgSrc: "/images/rocketIcon/earth.svg", text: "Suborbital" },
        { id: 92, imgSrc: "/images/rocketIcon/10.svg", text: "Starlink Satellites" },
        { id: 101, imgSrc: "/images/rocketIcon/booster.svg", text: 'B1060'},
        { id: 105, imgSrc: "/images/rocketIcon/booster.svg", text: 'B1062'},

    ];

    const tagMap: Record<number, Tag> = tagMapArray.reduce((obj: Record<number, Tag>, item) => {
        obj[item.id] = item;
        return obj;
    }, {});

    return { providers, tagMap }
}