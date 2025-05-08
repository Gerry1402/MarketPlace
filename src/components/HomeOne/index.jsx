import BackToTop from '../BackToTop.jsx';
import BlogHomeOne from './BlogHomeOne.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import FaqHomeOne from './FaqHomeOne.jsx';
import FeaturesHomeOne from './FeaturesHomeOne.jsx';
import FooterHomeOne from './FooterHomeOne.jsx';
import HeaderNews from '../News/HeaderNews.jsx';
import HeroHomeOne from './HeroHomeOne.jsx';
import HomeOneHeader from './HomeOneHeader.jsx';
import PricingHomeOne from './PricingHomeOne.jsx';
import ProjectHighlight from './proyectHighLight.jsx';
import ProjectHomeOne from './ProjectHomeOne.jsx';
import React from 'react';
import ServicesHomeOne from './ServicesHomeOne.jsx';
import TeamHomeOne from './TeamHomeOne.jsx';
import TestimonialHomeOne from './TestimonialHomeOne.jsx';
import TrafficHomeOne from './TrafficHomeOne.jsx';
import useToggle from '../../Hooks/useToggle.js';

const HomeOne = () => {
    const [drawer, drawerAction] = useToggle(false);

    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderNews />
            <HeroHomeOne />
            <ProjectHighlight />
            <ServicesHomeOne />
            <TrafficHomeOne />
            <TestimonialHomeOne />
            {/* <FeaturesHomeOne /> */}
            <TeamHomeOne />
            {/* <PricingHomeOne /> */}
            {/* <FaqHomeOne /> */}
            {/* <BlogHomeOne /> */}
            <ProjectHomeOne />
            <FooterHomeOne />
            <BackToTop />
        </>
    );
};

export default HomeOne;
