
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
        },
        {
            name: 'Galactic Energy',
            url: 'https://www.galactic-energy.cn/index.php/En',
            logo: "/logos/galactic-energy.png"
        },
        {
            name: 'China',
            url: 'https://www.cnsa.gov.cn/english/index.html',
            logo: '/logos/cnsa.png',
            twitter: 'https://twitter.com/cnsa_en?lang=en'
        },
        {
            name: 'Northrop Grumman',
            url: 'https://www.northropgrumman.com',
            logo: 'logos/NorthropGrumman.png',
            twitter: 'https://twitter.com/northropgrumman',
            youtube: 'https://www.youtube.com/@northropgrummanmedia/featured'
        }

    ]);

    const tagMapArray: Tag[] = [
        { id: 8, imgSrc: "/images/rocketIcon/33.svg", text: "Classified Payload 🤫" },
        { id: 9, imgSrc: "/images/rocketIcon/8.svg", text: "Crewed" },
        { id: 12, imgSrc: "/images/rocketIcon/iss.svg", text: "ISS Cargo" },
        { id: 13, imgSrc: "/images/rocketIcon/Landing.svg", text: "Landing Zone 1" },
        { id: 17, imgSrc: "/images/rocketIcon/iss.svg", text: "ISS Expedition" },
        { id: 22, imgSrc: "/images/rocketIcon/CCP.svg.png", text: "NASA Commercial Crew Program (CCP)" },
        { id: 24, imgSrc: "/images/rocketIcon/35.svg", text: "Communications Satellite" },
        { id: 25, imgSrc: "/images/rocketIcon/34.svg", text: "Earth Observation Satellite" },
        { id: 26, imgSrc: "/images/rocketIcon/40.svg", text: "Navigation Satellite" },
        { id: 29, imgSrc: "/images/rocketIcon/polar.svg", text: "Polar Orbit" },
        { id: 44, imgSrc: "/images/rocketIcon/32.svg", text: "Return to flight" },
        { id: 45, imgSrc: "/images/rocketIcon/32.svg", text: "Meteorological Satellite" },
        { id: 53, imgSrc: "/images/rocketIcon/unconfirmed.svg", text: 'Unconfirmed Payload'},
        { id: 54, imgSrc: "/images/rocketIcon/lander.svg", text: 'Lunar Lander'},
        { id: 55, imgSrc: "/images/rocketIcon/rover.svg", text: 'Lunar Rover'},
        { id: 68, imgSrc: "/images/rocketIcon/earth.svg", text: "Suborbital" },
        { id: 78, imgSrc: "/images/rocketIcon/Landing.svg", text: "Landing Zone 4" },
        { id: 92, imgSrc: "/images/rocketIcon/10.svg", text: "Starlink Satellites" },
        { id: 101, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1060'},
        { id: 104, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1061'},
        { id: 105, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1062'},
        { id: 103, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1063'},
        { id: 114, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1064'},
        { id: 115, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1065'},
        { id: 109, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1067'},
        { id: 110, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1069'},
        { id: 111, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1071'},
        { id: 112, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1073'},
        { id: 113, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1077'},
        { id: 123, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1074'},
        { id: 120, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1075'},
        { id: 117, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1076'},
        { id: 118, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1078'},
        { id: 122, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1079'},
        { id: 129, imgSrc: "/images/rocketIcon/booster.svg", text: 'Booster B1081'},
        { id: 130, imgSrc: "/images/rocketIcon/capsule.svg", text: 'Dragon Endurance'},
        { id: 131, imgSrc: "/images/rocketIcon/sda.svg", text: 'Series: Space Development Agency - Transport Tracking Layers'},
    ];

    const tagMap: Record<number, Tag> = tagMapArray.reduce((obj: Record<number, Tag>, item) => {
        obj[item.id] = item;
        return obj;
    }, {});

    return { providers, tagMap }
}