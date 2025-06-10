import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import StepCard from './components/StepCard';
import TroubleshootingCard from './components/TroubleshootingCard';
import KeyGuide from './components/KeyGuide';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex === currentStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      id: 1,
      title: "Install DNS Profile",
      icon: "🌐",
      difficulty: "Easy",
      timeEstimate: "2 minutes",
      content: [
        "Visit khoindvn.io.vn",
        "Scroll down a little and click 'Install DNS'",
        "Head into Settings and trust it, then install it"
      ],
      warning: "Make sure to trust the DNS profile in Settings before proceeding"
    },
    {
      id: 2,
      title: "Access the Bookmark App",
      icon: "📱",
      difficulty: "Easy",
      timeEstimate: "1 minute",
      content: [
        "An app will appear on your homescreen as a bookmark",
        "Make sure to press it to open the installer page"
      ]
    },
    {
      id: 3,
      title: "Install ESign App",
      icon: "📝",
      difficulty: "Medium",
      timeEstimate: "5 minutes",
      content: [
        "Scroll down until you see 'HDFC Bank...' (most successful for most people)",
        "If it doesn't work, uninstall the failed ESign and try other links",
        "Try Kotak Bank if HDFC doesn't work"
      ],
      warning: "If none work, you're revoked from all certificates and need to either purchase a certificate, wait for a new one, or factory reset your device (backup your photos first!)"
    },
    {
      id: 4,
      title: "Trust ESign in Settings",
      icon: "🔒",
      difficulty: "Easy",
      timeEstimate: "2 minutes",
      content: [
        "Go to Settings → General → VPN & Device Management",
        "Find ESign and trust the app",
        "You may need to restart on newer iOS versions"
      ]
    },
    {
      id: 5,
      title: "Install ESign Certificate",
      icon: "📜",
      difficulty: "Medium",
      timeEstimate: "3 minutes",
      content: [
        "Go back to the khoindvn bookmark",
        "Install the ESign certificate zip file",
        "Save it to Files app when prompted"
      ]
    },
    {
      id: 6,
      title: "Import Certificate in ESign",
      icon: "📂",
      difficulty: "Medium",
      timeEstimate: "5 minutes",
      content: [
        "Open ESign app and click the 3 dots in corner",
        "Press 'Import' and select the certificate zip file",
        "Unzip the file - a blue folder 'ESign Certs' should appear",
        "Click the same certificate you used to install ESign",
        "Click 'Import Certificate Management'"
      ]
    },
    {
      id: 7,
      title: "Download Delta IPA",
      icon: "⬇️",
      difficulty: "Easy",
      timeEstimate: "3 minutes",
      content: [
        "Go to deltaexploits.gg/delta-executor-ios",
        "Press Install (takes you to MediaFire)",
        "Download the zip and save to Files app"
      ]
    },
    {
      id: 8,
      title: "Import & Sign Delta",
      icon: "✍️",
      difficulty: "Hard",
      timeEstimate: "10 minutes",
      content: [
        "Import Delta zip into ESign and unzip",
        "Click the blue 'Payload' folder",
        "Click 'Roblox.app' → 'Signature' → 'Signature' again",
        "IMPORTANT: Change version from '2.668.568' to '2.670.714'",
        "Click signature to sign (don't close ESign too quickly)"
      ],
      warning: "Using updated version has higher ban risk but is not too high. The version change is critical to avoid 'Update Needed' popup!"
    }
  ];

  const troubleshootingSteps = [
    "Clear the cache and force stop the app, then rejoin",
    "Ensure there are no background processes running", 
    "In Developer Options, set background process limit to 'Don't keep activities' or 'Only one process'",
    "Delete any apps that have display overlay permission",
    "Turn off auto execute",
    "Turn off VC/Camera",
    "Turn graphics settings to low",
    "Join a baseplate game",
    "Free up RAM on your device"
  ];

  return (
    <div className="App">
      <Header />
      <Hero />
      
      <main className="main-content">
        <section className="steps-section">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Installation Guide</h2>
            <p>Follow these steps carefully to install Delta on your iOS device</p>
          </motion.div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isActive={currentStep === index}
                isCompleted={completedSteps.has(index)}
                onComplete={() => markStepComplete(index)}
              />
            ))}
          </div>
        </section>

        <KeyGuide />

        <TroubleshootingCard steps={troubleshootingSteps} />
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollToTop && (
          <FloatingActionButton onClick={scrollToTop} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
