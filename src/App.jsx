import React, { useState, useEffect, useRef } from 'react';
import {
  Film, Video, Scissors, Target, Layers, Play, X, ArrowDown, ChevronDown,
  ChevronLeft, ChevronRight, PenTool, Cpu, Compass, CheckCircle,
  Briefcase, Mail, FileText, ExternalLink, Sparkles, Camera,
  Clapperboard, Monitor, Image, Info, Send
} from 'lucide-react';
import GradientWaves from './GradientWaves';
import LineSidebar from './LineSidebar';

function App() {
  // States
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [isWorkflowDropdownOpen, setIsWorkflowDropdownOpen] = useState(false);
  const [achievementIndex, setAchievementIndex] = useState(0);

  const achievementImages = [
    { id: 1, src: '/ecti/1.png', title: 'Journey Achievement 01', category: 'ACHIEVEMENTS' },
    { id: 2, src: '/ecti/2.png', title: 'Journey Achievement 02', category: 'ACHIEVEMENTS' },
    { id: 3, src: '/ecti/3.png', title: 'Journey Achievement 03', category: 'ACHIEVEMENTS' },
    { id: 4, src: '/ecti/4.png', title: 'Journey Achievement 04', category: 'ACHIEVEMENTS' },
    { id: 5, src: '/ecti/5.png', title: 'Journey Achievement 05', category: 'ACHIEVEMENTS' },
    { id: 6, src: '/ecti/6.png', title: 'Journey Achievement 06', category: 'ACHIEVEMENTS' }
  ];
  const [milestoneIndex, setMilestoneIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isPlayingMockVideo, setIsPlayingMockVideo] = useState(false);
  const [videoTimecode, setVideoTimecode] = useState("00:00:00:00");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const videoRefs = useRef([]);

  const roles = ["Visual Storyteller", "Video Editor", "Graphic Designer", "AI Native Creator"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const [isAchievementPaused, setIsAchievementPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Comprehensive Asset Preloader (Images & Videos)
  useEffect(() => {
    // 1. Preload Images into Cache
    const imageUrls = [
      '/Images/logo.png',
      '/Images/me.jpeg',
      '/ecti/1.png', '/ecti/2.png', '/ecti/3.png', '/ecti/4.png', '/ecti/5.png', '/ecti/6.png',
      '/logos/pr.png', '/logos/capcut.png', '/logos/ps.png', '/logos/canva.png',
      '/logos/notion.svg', '/logos/linearr.png', '/logos/gpt.png', '/logos/claude logo.svg',
      '/logos/flow.webp', '/logos/kling.png', '/logos/hyperframes.png', '/logos/remotion.png',
      '/Images/e1.png', '/Images/e2.png', '/Images/b1.png', '/Images/b2.png',
      '/Workflow/Storyboard.png', '/Workflow/Moodboard.png'
    ];

    imageUrls.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // 2. Preload Videos into Browser RAM & HTTP Cache
    const videoUrls = [
      '/Videos/L1.mp4',
      '/Videos/R1.mp4',
      '/Videos/L2.mp4',
      '/Videos/R2.mp4',
      '/Workflow/Output.mp4'
    ];

    videoUrls.forEach((src) => {
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'auto';
      tempVideo.src = src;
      tempVideo.load();
    });
  }, []);

  useEffect(() => {
    if (isAchievementPaused) return;
    const interval = setInterval(() => {
      setAchievementIndex((prev) => (prev + 1) % achievementImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAchievementPaused, achievementImages.length]);

  const handleVideoHover = (index, isHovered) => {
    setHoveredIndex(isHovered ? index : null);
    const video = videoRefs.current[index];
    if (video) {
      if (isHovered) {
        video.muted = false;
        video.play().catch(() => { });
      } else {
        video.muted = true;
      }
    }
  };

  // Intersection Observer for Scroll Reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    document.querySelectorAll('.fade-up-element').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Timecode Simulator for Video Player
  useEffect(() => {
    let interval;
    if (isPlayingMockVideo) {
      let frames = 0;
      let seconds = 0;
      let minutes = 0;
      let hours = 0;
      interval = setInterval(() => {
        frames += 4; // Simulate 24fps
        if (frames >= 24) {
          frames = 0;
          seconds += 1;
        }
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }

        const pad = (num) => String(num).padStart(2, '0');
        setVideoTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
      }, 166); // Speed matching roughly 24fps display updates
    } else {
      setVideoTimecode("00:00:00:00");
    }
    return () => clearInterval(interval);
  }, [isPlayingMockVideo]);


  // Video Editing Projects Data
  const videoProjects = [
    {
      id: 1,
      title: "L1 Sequence",
      description: "Landscape Edit // Narrative Pacing (16:9)",
      thumbnail: "",
      videoUrl: "/Videos/L1.mp4",
      aspectRatio: "16/9"
    },
    {
      id: 2,
      title: "R1 Sequence",
      description: "Standard Concept // Mood & Tone (4:3)",
      thumbnail: "",
      videoUrl: "/Videos/R1.mp4",
      aspectRatio: "4/3"
    },
    {
      id: 3,
      title: "L2 Sequence",
      description: "Standard Montage // Speed Ramps & Color (4:3)",
      thumbnail: "",
      videoUrl: "/Videos/L2.mp4",
      aspectRatio: "4/3"
    },
    {
      id: 4,
      title: "R2 Sequence",
      description: "Landscape Story // High-Retention Flow (16:9)",
      thumbnail: "",
      videoUrl: "/Videos/R2.mp4",
      aspectRatio: "16/9"
    }
  ];

  // AI Workflow Step Details
  const workflowSteps = [
    {
      title: "Understanding the Script",
      subtitle: "Deconstructing narrative structure",
      desc: "Analyzing narrative pacing, script cues, and subtext structure before generating single frames.",
      icon: <FileText size={20} />
    },
    {
      title: "Creative Inputs",
      subtitle: "Directing cinematic style",
      desc: "Expanding the script with custom camera aspects, motion styles, lens details, and color definitions.",
      icon: <PenTool size={20} />
    },
    {
      title: "Storyboard",
      subtitle: "Visualizing layout structures",
      desc: "Translating concepts into a framework to lock down layout sequences, timing, and shot selections.",
      icon: <Layers size={20} />
    },
    {
      title: "Moodboard",
      subtitle: "Guaranteeing visual consistency",
      desc: "Setting environmental lighting models, texture sets, and style keys to maintain film-wide continuity.",
      icon: <Compass size={20} />
    },
    {
      title: "Production & Editing",
      subtitle: "Sequencing and timing",
      desc: "Stitching generated frames into a unified layout flow, pacing edits, and applying sound layers.",
      icon: <Scissors size={20} />
    },
    {
      title: "Final Output",
      subtitle: "Completed short sequence",
      desc: "The completed cinematic sequence ready for screening. Let the work speak for itself.",
      icon: <CheckCircle size={20} />
    }
  ];

  // AI Native Production Cards
  const aiNativeCards = [
    { title: "Script Analysis", desc: "Read and analyze character goals, location counts, and scene emotional scales in minutes." },
    { title: "Storyboard Generation", desc: "Instantly draft frame concepts to test narrative timing and focal structures before shooting." },
    { title: "Moodboards", desc: "Compose thematic references and lighting grades to align stakeholders immediately." },
    { title: "Shot Visualization", desc: "Previsualize lighting paths, camera tracks, and lens values without renting gear." },
    { title: "Motion Graphics", desc: "Prototype titles, custom overlay animations, and HUD elements on the fly." },
    { title: "AI Video Generation", desc: "Draft high-fidelity prototypes and scene references to map out edit pacing early." },
    { title: "Editing", desc: "Leverage automated transcript matching, rough cut syncs, and visual sorting utilities." },
    { title: "Creative Research", desc: "Gather historical costume palettes, set blueprints, and stylistic frames instantly." }
  ];

  // Categorized Tools Ecosystem with 6 Categories (2 per row across 3 rows)
  const toolCategories = [
    {
      category: "Video Editing",
      tagline: "Post-Production & Cutting",
      tools: [
        { name: "Premiere Pro", sub: "Edit • Pace • Polish", logo: "/logos/pr.png" },
        { name: "CapCut", sub: "Shorts • Engage • Accelerate", logo: "/logos/capcut.png", darkBg: false, rounded: true }
      ]
    },
    {
      category: "Graphic Designing",
      tagline: "Visual Art & Keyframes",
      tools: [
        { name: "Photoshop", sub: "Design • Composite • Transform", logo: "/logos/ps.png" },
        { name: "Canva", sub: "Brand • Layout • Publish", logo: "/logos/canva.png" }
      ]
    },
    {
      category: "Task Management",
      tagline: "Workspace & Project Sprints",
      tools: [
        { name: "Notion", sub: "Plan • Organize • Document", logo: "/logos/notion.svg", darkBg: true },
        { name: "Linear", sub: "Track • Prioritize • Deliver", logo: "/logos/linearr.png", darkBg: false }
      ]
    },
    {
      category: "AI Tools",
      tagline: "LLMs & Creative Intelligence",
      tools: [
        { name: "ChatGPT", sub: "Research • Brainstorm • Explore", logo: "/logos/gpt.png", darkBg: true },
        { name: "Claude AI", sub: "Think • Structure • Reason", logo: "/logos/claude logo.svg" }
      ]
    },
    {
      category: "AI Creation",
      tagline: "Generative Engines & Synthesis",
      tools: [
        { name: "Google Flow", sub: "Visualize • Generate • Direct", logo: "/logos/flow.webp" },
        { name: "Kling AI", sub: "Stylize • Simulate • Evolve", logo: "/logos/kling.png" }
      ]
    },
    {
      category: "AI Driven Motion Graphics",
      tagline: "Programmatic HUDs & Pre-vis",
      tools: [
        { name: "HyperFrames", sub: "Motion • Enhance • Elevate", logo: "/logos/hyperframes.png" },
        { name: "Remotion", sub: "Compose • Automate • Render", logo: "/logos/remotion.png" }
      ]
    }
  ];

  // Experience Timeline
  const experienceData = [
    {
      company: "Crea8tiv",
      role: "Video Editor",
      logo: "/Images/e1.png",
      description: "This is where I built my foundation in editing, storytelling, and production workflows."
    },
    {
      company: "PXL Brain",
      role: "AI Native Creator",
      logo: "/Images/e2.png",
      description: "Today I combine traditional editing with AI workflows to create faster and more scalable visual content."
    }
  ];

  // Beyond Work Projects Data
  const beyondWorkProjects = [
    {
      title: "Program Professor",
      role: "Shooting • Editing • Branding • Visual Identity",
      logo: "/Images/b1.png",
      desc: "An educational platform simplifying technical concepts, where I handled shooting, editing, branding, and visual identity.",
      platform: "youtube",
      url: "https://youtube.com/@programprofessor?si=vdMzaDcvTqxYrAIE"
    },
    {
      title: "Mixchar",
      role: "Film Edits • Visual Storytelling • Posters",
      logo: "/Images/b2.png",
      desc: "A cinema-first creative page where I explore film edits, visual storytelling, posters, and content inspired by the movies I love.",
      platform: "instagram",
      url: "https://www.instagram.com/eswars.mixchar?igsh=MXY1d29vZGJkZnp2bQ=="
    }
  ];

  // Milestones Slideshow
  const milestoneSlides = [
    { caption: "Analyzing lenses and shot designs for conceptual short sequences.", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop" },
    { caption: "Developing and rendering digital compositions with advanced generative lighting.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
    { caption: "Synchronizing custom sound layers with pacing metrics for experimental cuts.", img: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=800&auto=format&fit=crop" },
    { caption: "Iterating cinematic scripts from storyboard to color-graded concept frames.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" }
  ];

  // Navigation click handling
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextMilestone = () => {
    setMilestoneIndex((prev) => (prev + 1) % milestoneSlides.length);
  };

  const handlePrevMilestone = () => {
    setMilestoneIndex((prev) => (prev - 1 + milestoneSlides.length) % milestoneSlides.length);
  };

  const renderWorkflowStepVisual = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Understanding the Script
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' }} className="screenplay-split-grid">
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-muted)', padding: '20px', borderRadius: '4px', textAlign: 'left' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-violet)', fontWeight: 'bold', display: 'block', marginBottom: '10px', letterSpacing: '1px' }}>WHAT I LOOK FOR</span>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Story progression:</strong> Kael's vulnerability builds tension, leading to the data key insertion action.</li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Scene transitions:</strong> Sharp lighting change (deep violet flash) signals a shift in pacing.</li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Character consistency:</strong> Maintain Kael's weary expression and tactical attire across generative prompts.</li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Visual style changes:</strong> Shift from dim cool lighting to intense high-contrast violet shadows.</li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Opportunities to enhance storytelling:</strong> Enhance the hum with sound design to reflect Kael's anxiety.</li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: '#fff' }}>· Technical challenges:</strong> Synchronizing the light pulse on Kael's face with the generative engine's consistency checks.</li>
              </ul>
              <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                "This step helps me understand not just what happens, but how it should feel."
              </div>
            </div>
            <div className="screenplay-container">
              <div style={{ fontSize: '0.7rem', color: '#8e8e9f', marginBottom: '1rem', fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                ORIGINAL SCREENPLAY Snip // SCENE 01
              </div>
              <div className="screenplay-slugline">INT. ARCHIVE CORE - NIGHT</div>
              <div className="screenplay-action">
                A cold metallic space. Dim blue indicators pulse in sequence. KAEL (20s) stands shivering, breath fogging, eyes locked on the primary mainframe stack.
              </div>
              <div className="screenplay-character">KAEL</div>
              <div className="screenplay-parenthetical">(whispering to transceiver)</div>
              <div className="screenplay-dialogue">
                "System is isolated. The key is in. Beginning payload upload now."
              </div>
              <div className="screenplay-action">
                He slides the glowing DATA KEY into the interface drive slot. A heavy magnetic lock clicks shut.
              </div>
              <div className="screenplay-action">
                Instantly, the central glass column floods with an intense VIOLET SHIFT. Cool blue transitions to deep ultraviolet.
              </div>
            </div>
          </div>
        );
      case 1: // Creative Inputs
        return (
          <div className="notebook-grid">
            <div className="notebook-card">
              <h4 className="notebook-card-title">Camera Movements</h4>
              <p className="notebook-card-desc">Anamorphic handheld tracking shots pushing toward the mainframe slot; dramatic rack-focus to Kael's eyes.</p>
            </div>
            <div className="notebook-card">
              <h4 className="notebook-card-title">Transition Ideas</h4>
              <p className="notebook-card-desc">Cut-on-action match cut of the data key sliding in, transitioning straight to the glowing ultraviolet core eruption.</p>
            </div>
            <div className="notebook-card">
              <h4 className="notebook-card-title">Emotional Pacing</h4>
              <p className="notebook-card-desc">Slow, quiet suspense with deep breathing audio, contrasted with a sudden high-intensity musical pulse on the color shift.</p>
            </div>
            <div className="notebook-card">
              <h4 className="notebook-card-title">Environmental Details</h4>
              <p className="notebook-card-desc">Atmospheric metal dust, pulsing purple warning indicators, heavy moisture venting from overhead structural conduits.</p>
            </div>
            <div className="notebook-card">
              <h4 className="notebook-card-title">Character Expressions</h4>
              <p className="notebook-card-desc">Micro-expressions of absolute focus, brief fatigue, and sudden sensory reaction as the core color floods the space.</p>
            </div>
            <div className="notebook-card">
              <h4 className="notebook-card-title">Cinematic Moments</h4>
              <p className="notebook-card-desc">Anamorphic flares catching the edge of Kael's tactical gear, establishing scale and production value.</p>
            </div>
          </div>
        );
      case 2: // Storyboarding
        return (
          <div className="storyboard-strip">
            <div className="storyboard-card">
              <div className="storyboard-image-box">
                <img src="/storyboard_sketch.png" alt="Frame 01" className="storyboard-image-placeholder" />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'monospace' }}>FRAME 01</div>
              </div>
              <div className="storyboard-meta">
                <span className="storyboard-frame-num">Establishment // 16:9</span>
                <p className="storyboard-caption">Establishing shot showing Kael looking up at the massive archive stack.</p>
              </div>
            </div>
            <div className="storyboard-card">
              <div className="storyboard-image-box">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop" alt="Frame 02" className="storyboard-image-placeholder" />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'monospace' }}>FRAME 02</div>
              </div>
              <div className="storyboard-meta">
                <span className="storyboard-frame-num">Extreme Close Up // Anamorphic</span>
                <p className="storyboard-caption">Kael's eye reflecting the glowing digital screen interface.</p>
              </div>
            </div>
          </div>
        );
      case 3: // Moodboard
        return (
          <div className="moodboard-layout">
            <div className="moodboard-swatches">
              <div className="moodboard-swatch" style={{ backgroundColor: '#08080c' }}><span className="moodboard-swatch-label">#08080C</span></div>
              <div className="moodboard-swatch" style={{ backgroundColor: '#161622' }}><span className="moodboard-swatch-label">#161622</span></div>
              <div className="moodboard-swatch" style={{ backgroundColor: '#8b5cf6' }}><span className="moodboard-swatch-label">#8B5CF6</span></div>
              <div className="moodboard-swatch" style={{ backgroundColor: '#4d1680' }}><span className="moodboard-swatch-label">#4D1680</span></div>
              <div className="moodboard-swatch" style={{ backgroundColor: '#10b981' }}><span className="moodboard-swatch-label">#10B981</span></div>
            </div>
            <div className="moodboard-categories">
              <div className="moodboard-category-card">
                <h4 className="moodboard-cat-title">Lighting</h4>
                <div className="moodboard-cat-items">
                  <span className="moodboard-tag">Low Key Dim</span>
                  <span className="moodboard-tag">Violet Edge Glow</span>
                  <span className="moodboard-tag">Flares</span>
                </div>
              </div>
              <div className="moodboard-category-card">
                <h4 className="moodboard-cat-title">Environment</h4>
                <div className="moodboard-cat-items">
                  <span className="moodboard-tag">Brutalist Steel</span>
                  <span className="moodboard-tag">Wet Concrete</span>
                  <span className="moodboard-tag">Holo-Fog</span>
                </div>
              </div>
              <div className="moodboard-category-card">
                <h4 className="moodboard-cat-title">Visual Language</h4>
                <div className="moodboard-cat-items">
                  <span className="moodboard-tag">Anamorphic</span>
                  <span className="moodboard-tag">High Contrast</span>
                  <span className="moodboard-tag">35mm Grain</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4: // Production & Editing
        return (
          <div className="sequencer-container">
            <div className="sequencer-header-bar">
              <div><span className="sequencer-indicator-red"></span>TIMELINE SEQUENCER // ACTIVE EDIT</div>
              <div>00:00:18:12</div>
            </div>
            <div className="sequencer-timeline">
              <div className="sequencer-track">
                <div className="sequencer-track-label">V1</div>
                <div className="sequencer-track-lane">
                  <div className="sequencer-clip" style={{ width: '45%' }}>01_EST_ARCHIVE.mp4</div>
                  <div className="sequencer-clip" style={{ width: '35%' }}>02_MCU_KAEL.mp4</div>
                  <div className="sequencer-clip" style={{ width: '20%' }}>03_INSERT_KEY.mp4</div>
                </div>
              </div>
              <div className="sequencer-track">
                <div className="sequencer-track-label">A1</div>
                <div className="sequencer-track-lane">
                  <div className="sequencer-clip audio" style={{ width: '45%', opacity: 0.3 }}>[ silence ]</div>
                  <div className="sequencer-clip audio" style={{ width: '35%' }}>"System isolated..."</div>
                  <div className="sequencer-clip audio" style={{ width: '20%', opacity: 0.3 }}>[ silence ]</div>
                </div>
              </div>
              <div className="sequencer-track">
                <div className="sequencer-track-label">A2</div>
                <div className="sequencer-track-lane">
                  <div className="sequencer-clip audio" style={{ width: '80%' }}>Mainframe Ambient Hum.wav</div>
                  <div className="sequencer-clip audio" style={{ width: '20%' }}>MagLock_Click.wav</div>
                </div>
              </div>
              <div className="sequencer-track">
                <div className="sequencer-track-label">A3</div>
                <div className="sequencer-track-lane">
                  <div className="sequencer-clip music" style={{ width: '100%' }}>Tension Pad (Slow Rise).mp3</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}><strong>Shot Selection:</strong> Critical pacing match</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}><strong>Sound Design:</strong> Layered ambient soundscapes</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}><strong>Transitions:</strong> Action match cuts</div>
            </div>
          </div>
        );
      case 5: // Final Output
        return (
          <div className="cinematic-screener-wrapper">
            <div className="screener-hud-header">
              <div>SCREENER MASTER // FINAL OUTPUT</div>
              <div className="screener-hud-title">SELECTED TOP 10 // PRADEEP RANGANATHAN TEAM</div>
            </div>
            <div className="screener-video-container">
              <video
                src="/Videos/L1.mp4"
                className="screener-video-element"
                controls
                poster="/film_poster.png"
                playsInline
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', position: 'relative' }}>

      {/* Global Fixed Live Gradient Waves Background */}
      <div style={styles.darkVeilBackground} className="global-live-bg">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>

      {/* Cinematic Moving Spotlight Light Beam */}
      <div className="light-beam"></div>

      {/* Floating Minimal HUD Navbar */}
      <header style={styles.hudNavbar}>
        <div style={{ ...styles.hudLogo, cursor: 'pointer' }} onClick={() => scrollTo('landing')}>
          <img src="/Images/logo.png" alt="Eswar Logo" style={{ ...styles.hudLogoImage, cursor: 'pointer' }} />
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '38px' }} className="hud-nav-links">
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('editing-room')}>VIDEOS</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('storytelling')}>GALLERY</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('ai-workflow')}>WORKFLOW</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('tools-stack')}>TOOLS</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('experience')}>EXPERIENCE</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('beyond-work')}>VENTURES</span>
          <span className="hud-nav-item font-dopestyle" style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>CONTACT</span>
        </nav>
      </header>

      {/* ================= SECTION 1: LANDING ================= */}
      <section id="landing" className="scene-section" style={styles.heroSection}>
        <div className="hero-landing-grid" style={styles.heroGrid}>

          {/* LEFT: Text Container */}
          <div className="hero-text-container" style={styles.heroTextContainer}>
            <h1 className="hero-name font-peacesans" style={styles.heroName}>ESWAR ANAND</h1>
            <div className="hero-rotating-wrapper" style={styles.rotatingTextWrapper}>
              <h2 className="hero-rotating-header font-midlenorth" style={styles.rotatingTextHeader}>
                <span key={currentRoleIndex} className="role-text-fade">
                  {roles[currentRoleIndex]}
                </span>
              </h2>
            </div>

            {/* Muted Bio Subtitle */}
            <p className="font-recoleta" style={{
              color: 'var(--text-muted)',
              fontSize: '1.18rem',
              lineHeight: '1.7',
              marginTop: '22px',
              maxWidth: '600px',
              opacity: 0.9
            }}>
              Editing, design, storytelling, and AI are things I'm learning.<br />
              Cinema is the reason I wanted to learn them in the first place
            </p>
          </div>

          {/* RIGHT: Portrait Container */}
          <div className="hero-portrait-container" style={styles.portraitContainer}>
            <div style={styles.portraitFrame}>
              <img
                src="/Images/me.jpeg"
                alt="Eswar Cinematic Portrait"
                style={styles.portraitImage}
              />
              <div style={styles.portraitOverlay}></div>
              {/* Cameraman viewfinder overlay */}
              <div style={styles.viewfinderCornerTL}></div>
              <div style={styles.viewfinderCornerTR}></div>
              <div style={styles.viewfinderCornerBL}></div>
              <div style={styles.viewfinderCornerBR}></div>
              <span style={styles.recDot}></span>
              <span style={styles.recText}>REC</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: VIDEO (THE EDITING ROOM) ================= */}
      <section id="editing-room" className="scene-section">
        <div style={styles.container}>
          <div style={styles.textCenter} className="fade-up-element">
            <h2 style={styles.sectionHeading} className="font-peacesans">THE EDITING ROOM</h2>
          </div>

          <div style={styles.videoRowsContainer} className="fade-up-element">
            {/* Row 1: L1 & R1 */}
            <div className="video-row" style={styles.videoRow}>
              <div
                style={{ ...styles.videoCard, flex: 1.777, aspectRatio: '16/9' }}
                onClick={() => {
                  setActiveVideo(videoProjects[0]);
                  setIsPlayingMockVideo(true);
                }}
                onMouseEnter={() => handleVideoHover(0, true)}
                onMouseLeave={() => handleVideoHover(0, false)}
                className="video-card-wrapper"
              >
                <div style={styles.videoThumbContainer}>
                  <video
                    ref={el => videoRefs.current[0] = el}
                    src={videoProjects[0].videoUrl}
                    style={styles.videoThumb}
                    preload="auto"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div style={{
                    ...styles.videoPlayOverlay,
                    opacity: hoveredIndex === 0 ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div style={styles.playIconCircle}>
                      <Play size={20} style={{ color: '#000', marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ ...styles.videoCard, flex: 1.333, aspectRatio: '4/3' }}
                onClick={() => {
                  setActiveVideo(videoProjects[1]);
                  setIsPlayingMockVideo(true);
                }}
                onMouseEnter={() => handleVideoHover(1, true)}
                onMouseLeave={() => handleVideoHover(1, false)}
                className="video-card-wrapper"
              >
                <div style={styles.videoThumbContainer}>
                  <video
                    ref={el => videoRefs.current[1] = el}
                    src={videoProjects[1].videoUrl}
                    style={styles.videoThumb}
                    preload="auto"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div style={{
                    ...styles.videoPlayOverlay,
                    opacity: hoveredIndex === 1 ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div style={styles.playIconCircle}>
                      <Play size={20} style={{ color: '#000', marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: L2 & R2 */}
            <div className="video-row" style={styles.videoRow}>
              <div
                style={{ ...styles.videoCard, flex: 1.333, aspectRatio: '4/3' }}
                onClick={() => {
                  setActiveVideo(videoProjects[2]);
                  setIsPlayingMockVideo(true);
                }}
                onMouseEnter={() => handleVideoHover(2, true)}
                onMouseLeave={() => handleVideoHover(2, false)}
                className="video-card-wrapper"
              >
                <div style={styles.videoThumbContainer}>
                  <video
                    ref={el => videoRefs.current[2] = el}
                    src={videoProjects[2].videoUrl}
                    style={styles.videoThumb}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div style={{
                    ...styles.videoPlayOverlay,
                    opacity: hoveredIndex === 2 ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div style={styles.playIconCircle}>
                      <Play size={20} style={{ color: '#000', marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ ...styles.videoCard, flex: 1.777, aspectRatio: '16/9' }}
                onClick={() => {
                  setActiveVideo(videoProjects[3]);
                  setIsPlayingMockVideo(true);
                }}
                onMouseEnter={() => handleVideoHover(3, true)}
                onMouseLeave={() => handleVideoHover(3, false)}
                className="video-card-wrapper"
              >
                <div style={styles.videoThumbContainer}>
                  <video
                    ref={el => videoRefs.current[3] = el}
                    src={videoProjects[3].videoUrl}
                    style={styles.videoThumb}
                    preload="auto"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div style={{
                    ...styles.videoPlayOverlay,
                    opacity: hoveredIndex === 3 ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div style={styles.playIconCircle}>
                      <Play size={20} style={{ color: '#000', marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: IMAGES (ART GALLERY) ================= */}
      <section id="storytelling" className="scene-section" style={{ background: 'rgba(12, 12, 18, 0.45)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '90px 5vw' }}>
        <div style={styles.container}>
          <div style={styles.textCenter} className="fade-up-element">
            <h2 style={styles.sectionHeading} className="font-peacesans">ART GALLERY</h2>
          </div>

          <div style={styles.imageGridContainer} className="fade-up-element image-grid-container">
            <div style={styles.row1} className="image-grid-row1">
              <img src="/Images/1.jpg" alt="Scene 3 - Frame 1" style={styles.row1Image} className="img-frame-1" />
              <img src="/Images/2.jpg" alt="Scene 3 - Frame 2" style={styles.row1Image} className="img-frame-2" />
              <img src="/Images/3.jpg" alt="Scene 3 - Frame 3" style={styles.row1Image} className="img-frame-3" />
              <img src="/Images/4.jpg" alt="Scene 3 - Frame 4" style={styles.row1Image} className="img-frame-4" />
              <img src="/Images/5.jpg" alt="Scene 3 - Frame 5" style={styles.row1Image} className="img-frame-5" />
            </div>
            <div style={styles.row2} className="image-grid-row2">
              <img src="/Images/6.jpg" alt="Scene 3 - Frame 6" style={styles.row2Image} className="img-frame-6" />
              <img src="/Images/7.jpg" alt="Scene 3 - Frame 7" style={styles.row2Image} className="img-frame-7" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: VIDEO (AI WORKFLOW CASE STUDY) ================= */}
      <section id="ai-workflow" className="scene-section" style={{ background: 'transparent', minHeight: '80vh', padding: '90px 5vw 70px 5vw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...styles.container, width: '100%', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header with Title & Winner Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '28px', gap: '20px', flexWrap: 'wrap' }}>
            <h2 style={{ ...styles.sectionHeading, margin: 0 }} className="font-peacesans">AI WORKFLOW</h2>

            {/* Winner Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 18, 26, 0.75)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: '6px', backdropFilter: 'blur(10px)' }}>
              <span className="font-peacesans" style={{ color: '#fff', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Top 10 / 6,000+</span>
            </div>
          </div>

          {/* 2-Column Split: Left Sidebar Nav + Right Content Area (Cardless Layout) */}
          <div className="case-study-grid-container" style={{ ...styles.caseStudyGrid, width: '100%' }}>
            
            {/* LEFT SIDEBAR NAVIGATION */}
            <div className="case-study-sidebar-col" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '20px' }}>
              <LineSidebar
                items={['CHALLENGE BRIEF', 'MY APPROACH', 'STORYBOARDING', 'MOODBOARD', 'FINAL OUTPUT']}
                accentColor="#A855F7"
                textColor="#c4c4c4"
                markerColor="#6c6c6c"
                showIndex
                showMarker
                proximityRadius={100}
                maxShift={30}
                falloff="smooth"
                markerLength={60}
                markerGap={0}
                tickScale={0.5}
                scaleTick
                itemGap={20}
                fontSize={0.95}
                smoothing={100}
                defaultActive={activeWorkflowStep}
                onItemClick={(index) => setActiveWorkflowStep(index)}
              />
            </div>

            {/* RIGHT CONTENT COLUMN */}
            <div className="case-study-content-col" style={{ flex: 1, paddingLeft: '10px' }}>
              
              {/* Active Step Heading */}
              <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                <h3 style={{ ...styles.slideTitle, margin: 0 }} className="font-peacesans">
                  {['CHALLENGE BRIEF', 'MY APPROACH', 'STORYBOARDING', 'MOODBOARD', 'FINAL OUTPUT'][activeWorkflowStep]}
                </h3>
              </div>

              {activeWorkflowStep === 0 && (
                <div className="case-study-slide">
                  <div className="screenplay-container" style={{ maxHeight: '450px', borderLeft: '3px solid var(--accent-violet)', background: '#0a0a0f', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--accent-violet)', marginBottom: '1rem', fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                      <span>For Team Pradeep Ranganathan</span>
                      <span>AI Artist Challenge</span>
                    </div>
                    <p className="font-recoleta" style={{ fontSize: '1.05rem', color: '#e2e8f0', lineHeight: '1.8', margin: 0 }}>
                      We show a remote, the camera zooms in to the remote. Inside the remote a Pixar style ant bites the wire, looks at the camera and winks. The background is realistic but only the ant should be in the pixar style. Now Pradeep comes and takes the remote and presses a button, a shock hits, he gets into the TV with the remote, he is in a historical battle field. His costume changes according to the historical world with the crown. He runs from the war, fights some people and escapes. Then he presses the next channel button, and now goes to the cartoon world in a stylish 3D animation / anime style. Now Pradeep is in a museum, it's a futuristic gadget museum, some masked men come to steal the gadget, Pradeep stops them. He fights with comical stylish action. Now he presses the turn off button. He comes out to the normal world. At the end we cut back inside the remote and the Pixar style ant winks again.
                    </p>
                  </div>
                </div>
              )}

              {activeWorkflowStep === 1 && (
                <div className="case-study-slide">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '10px 0' }}>
                    
                    {/* Steps 1-3 in 3-column Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                      
                      {/* Step 1 */}
                      <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--accent-violet)', background: 'rgba(139, 92, 246, 0.03)', padding: '16px 18px', borderRadius: '0 8px 8px 0' }}>
                        <span className="font-dopestyle" style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', display: 'block', marginBottom: '6px', letterSpacing: '1.5px' }}>
                          01 // MUSIC & EMOTIONAL PACING
                        </span>
                        <p className="font-recoleta" style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.65', margin: 0 }}>
                          I usually start with the music because it helps me understand the pace and emotion before I begin creating anything.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.02)', padding: '16px 18px', borderRadius: '0 8px 8px 0' }}>
                        <span className="font-dopestyle" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '6px', letterSpacing: '1.5px' }}>
                          02 // CHARACTER & SCENE VISUALS
                        </span>
                        <p className="font-recoleta" style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.65', margin: 0 }}>
                          Once the mood is clear, I focus on keeping the characters consistent and generate the visuals needed for each scene.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.02)', padding: '16px 18px', borderRadius: '0 8px 8px 0' }}>
                        <span className="font-dopestyle" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '6px', letterSpacing: '1.5px' }}>
                          03 // TIMELINE & EDITING FINESSE
                        </span>
                        <p className="font-recoleta" style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.65', margin: 0 }}>
                          After that, I bring everything into the timeline and fine-tune it with transitions, keyframes, speed ramps, and effects until it feels smooth and connected.
                        </p>
                      </div>

                    </div>

                    {/* Step 4: Long Full-Width Bar Spanning Left to Right */}
                    <div style={{ 
                      width: '100%', 
                      padding: '20px 24px', 
                      background: 'rgba(139, 92, 246, 0.05)', 
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderLeft: '4px solid var(--accent-gold)', 
                      borderRadius: '8px',
                      marginTop: '4px'
                    }}>
                      <span className="font-dopestyle" style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', display: 'block', marginBottom: '8px', letterSpacing: '2px' }}>
                        04 // CREATIVE DIRECTION
                      </span>
                      <p className="font-recoleta" style={{ fontSize: '1.02rem', color: '#f1f5f9', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                        For me, AI is just a tool. The vision, pacing, and storytelling still come from the creative decisions made throughout the process.
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {activeWorkflowStep === 2 && (
                <div className="case-study-slide">
                  <img src="/Workflow/Storyboard.png" alt="Storyboard" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }} />
                </div>
              )}

              {activeWorkflowStep === 3 && (
                <div className="case-study-slide">
                  <img src="/Workflow/Moodboard.png" alt="Moodboard" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }} />
                </div>
              )}

              {activeWorkflowStep === 4 && (
                <div className="case-study-slide">
                  <div className="cinematic-screener-wrapper" style={{ border: '1px solid rgba(139, 92, 246, 0.35)', boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 30px rgba(139, 92, 246, 0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="screener-video-container" style={{ aspectRatio: '16/9', background: '#000' }}>
                      <video 
                        src="/Workflow/Output.mp4" 
                        className="screener-video-element" 
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: TOOLS (TOOLS I USE) ================= */}
      <section id="tools-stack" className="scene-section" style={{ background: 'rgba(12, 12, 18, 0.45)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '90px 5vw' }}>
        <div style={styles.container}>
          <div style={styles.textCenter} className="fade-up-element">
            <h2 style={styles.sectionHeading} className="font-peacesans">TOOLS I USE</h2>
          </div>

          <div className="tools-categories-grid fade-up-element">
            {toolCategories.map((cat, idx) => (
              <div key={idx} className="tools-category-card">
                <div className="tools-category-title-box">
                  <span className="tools-category-num font-dopestyle">// 0{idx + 1}</span>
                  <h3 className="tools-category-name font-peacesans">{cat.category}</h3>
                </div>

                <div className="tools-inline-grid">
                  {cat.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="tool-clean-item">
                      <div className="tool-logo-large-wrap">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className={`tool-logo-large ${tool.darkBg ? 'dark-logo-invert' : ''}`} 
                          style={tool.rounded ? { borderRadius: '12px', overflow: 'hidden' } : {}}
                        />
                      </div>
                      <div className="tool-clean-meta">
                        <h4 className="tool-clean-name font-peacesans">{tool.name}</h4>
                        <span className="tool-clean-sub font-recoleta">{tool.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: EXPERIENCE (PROFESSIONAL PATHWAY) ================= */}
      <section id="experience" className="scene-section" style={{ background: 'transparent', padding: '90px 5vw' }}>
        <div style={styles.container}>
          <div style={styles.textCenter} className="fade-up-element">
            <h2 style={styles.sectionHeading} className="font-peacesans">PROFESSIONAL PATHWAY</h2>
          </div>

          <div style={styles.timelineWrapper} className="fade-up-element">
            {experienceData.map((exp, idx) => (
              <div key={idx} style={styles.experienceTimelineRow} className="experience-timeline-row">
                <div style={styles.timelineSideLabel} className="timeline-side-label">
                  <div style={styles.timelineLogoContainer} className="timeline-logo-container">
                    <img src={exp.logo} alt={exp.company} style={styles.timelineLogo} />
                  </div>
                  <span style={styles.experienceCompany} className="font-dopestyle experience-company-title">{exp.company}</span>
                </div>
                <div style={styles.timelineMainContent} className="timeline-main-content">
                  <h3 style={styles.experienceRole} className="font-peacesans experience-role-title">{exp.role}</h3>
                  <p style={styles.experienceDesc} className="font-midlenorth">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: BEYOND WORK ================= */}
      <section id="beyond-work" className="scene-section" style={{ background: 'rgba(12, 12, 18, 0.45)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '90px 5vw' }}>
        <div style={styles.container}>
          <div style={styles.textCenter} className="fade-up-element">
            <h2 style={styles.sectionHeading} className="font-peacesans">BEYOND WORK</h2>
          </div>

          <div style={styles.beyondWorkGrid} className="fade-up-element">
            {beyondWorkProjects.map((proj, idx) => (
              <div key={idx} style={styles.beyondWorkCard} className="beyond-work-card">
                <a 
                  href={proj.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={styles.beyondWorkThumbContainer} className="beyond-work-thumb-container">
                    <img src={proj.logo} alt={proj.title} style={styles.beyondWorkThumb} />
                    <div style={styles.platformIconOverlay}>
                      {proj.platform === 'youtube' ? (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: '#ff0000' }}>
                          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e1306c' }}>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                    </div>
                  </div>
                </a>
                <div style={styles.beyondWorkMeta}>
                  <h3 style={styles.beyondWorkCardTitle} className="font-peacesans">
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {proj.title}
                    </a>
                  </h3>
                  <span style={styles.beyondWorkCardRole} className="font-dopestyle">{proj.role}</span>
                  <p style={styles.beyondWorkCardDesc}>{proj.desc}</p>
                  
                  <a 
                    href={proj.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary font-dopestyle" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginTop: '16px', 
                      padding: '8px 18px', 
                      fontSize: '0.8rem', 
                      letterSpacing: '1px', 
                      textDecoration: 'none', 
                      borderColor: 'rgba(255, 255, 255, 0.25)', 
                      color: '#ffffff',
                      borderRadius: '6px',
                      width: 'fit-content'
                    }}
                  >
                    <ExternalLink size={14} />
                    OPEN CHANNEL
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Top Footer Gradient Line Separator */}
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(212, 175, 55, 0.5), transparent)' }}></div>

      {/* ================= SECTION 8: FINAL UNIFIED FOOTER ================= */}
      <footer id="contact" className="scene-section" style={{ 
        background: 'rgba(8, 8, 14, 0.88)', 
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.7)',
        padding: '70px 5vw 90px 5vw',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{ ...styles.container, width: '100%', maxWidth: '1350px', margin: '0 auto' }}>
          
          {/* Seamless Page-Width Footer Layout */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '56px', 
              alignItems: 'stretch',
              width: '100%' 
            }}
            className="fade-up-element footer-grid-container"
          >
            {/* LEFT COLUMN: Large Media Slideshow */}
            <div 
              style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => setIsAchievementPaused(true)}
              onMouseLeave={() => setIsAchievementPaused(false)}
            >
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '0px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: '#09090d',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                }}
                onClick={() => setActiveGalleryImage({ 
                  src: achievementImages[achievementIndex].src, 
                  title: achievementImages[achievementIndex].title,
                  category: 'PORTFOLIO' 
                })}
              >
                <img 
                  key={achievementIndex}
                  src={achievementImages[achievementIndex].src} 
                  alt={`Slide ${achievementIndex + 1}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '0px',
                    transition: 'opacity 0.4s ease, transform 0.4s ease'
                  }}
                  className="role-text-fade"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Title + Text + 3 Contact Button Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '28px', textAlign: 'left' }}>
              
              {/* Upper Text Area */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h2 style={{ ...styles.finalHeading, textAlign: 'left', margin: 0, fontSize: '2.1rem' }} className="font-peacesans">
                  LET'S CREATE SOMETHING MEANINGFUL
                </h2>
                
                <p style={{ ...styles.finalText, textAlign: 'left', margin: 0, fontSize: '1.08rem', lineHeight: '1.7', opacity: 0.9 }} className="font-midlenorth">
                  Cinema is something I'm genuinely passionate about, and I'd love to be part of a team that shares the same passion. I'm looking forward to contributing, learning, and growing with every project that comes my way. I know there's still so much for me to learn, and that's exactly what excites me about this journey. I hope we get the chance to learn, grow, and make great cinema together.
                </p>
              </div>

              {/* Bottom Row: Minimal Contact Links */}
              <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center', paddingTop: '10px' }}>
                
                {/* Contact 1: Email */}
                <a 
                  href="mailto:eswaranand1999@gmail.com" 
                  className="font-dopestyle" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    color: '#e2e8f0', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    letterSpacing: '0.8px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--accent-violet)' }} />
                  eswaranand1999@gmail.com
                </a>

                {/* Contact 2: Phone */}
                <a 
                  href="tel:+916369489951" 
                  className="font-dopestyle" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    color: '#e2e8f0', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    letterSpacing: '0.8px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-violet)' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +91 63694 89951
                </a>

                {/* Contact 3: Instagram */}
                <a 
                  href="https://instagram.com/eswaranand_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-dopestyle" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    color: '#e2e8f0', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    letterSpacing: '0.8px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e1306c' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  eswaranand_
                </a>

              </div>

            </div>
          </div>

        </div>
      </footer>

      {/* ================= MODAL: GRAPHIC GALLERY LIGHTBOX ================= */}
      {activeGalleryImage && (
        <div style={styles.modalOverlay} onClick={() => setActiveGalleryImage(null)}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseBtn} onClick={() => setActiveGalleryImage(null)}>
              <X size={20} />
            </button>
            <img src={activeGalleryImage.src} alt={activeGalleryImage.title} style={styles.lightboxImg} />
            <div style={styles.lightboxMeta}>
              <span style={styles.lightboxCategory}>{activeGalleryImage.category}</span>
              <h3 style={styles.lightboxTitle}>{activeGalleryImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDITING ROOM VIDEO SCREENER ================= */}
      {activeVideo && (
        <div style={styles.modalOverlay} onClick={() => {
          setActiveVideo(null);
          setIsPlayingMockVideo(false);
        }}>
          <div style={{
            ...styles.videoPlayerContent,
            aspectRatio: activeVideo.aspectRatio,
            width: activeVideo.aspectRatio === '4/3' ? 'min(92vw, 85vh * 1.333)' : 'min(92vw, 85vh * 1.777)',
            maxWidth: activeVideo.aspectRatio === '4/3' ? '1000px' : '1200px',
            maxHeight: 'none',
            display: 'block',
          }} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseBtn} onClick={() => {
              setActiveVideo(null);
              setIsPlayingMockVideo(false);
            }}>
              <X size={20} />
            </button>

            <div style={{ ...styles.videoWrapper, width: '100%', height: '100%', aspectRatio: 'auto', border: 'none' }}>
              <video
                src={activeVideo.videoUrl}
                style={styles.screenerVideo}
                preload="auto"
                autoPlay
                loop
                onPlay={() => setIsPlayingMockVideo(true)}
                onPause={() => setIsPlayingMockVideo(false)}
                controls
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: GET IN TOUCH DIALOG ================= */}
      {showContactModal && (
        <div style={styles.modalOverlay} onClick={() => {
          setShowContactModal(false);
          setContactSubmitted(false);
        }}>
          <div style={styles.contactContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseBtn} onClick={() => {
              setShowContactModal(false);
              setContactSubmitted(false);
            }}>
              <X size={20} />
            </button>

            <h3 style={styles.contactTitle}>ESTABLISH CONNECTION</h3>
            <p style={styles.contactDesc}>
              Let's talk sequence planning, editing metrics, or storyboard workflows.
            </p>

            {contactSubmitted ? (
              <div style={styles.contactSuccess}>
                <CheckCircle size={40} style={{ color: 'var(--accent-gold)', marginBottom: 15 }} />
                <h4>CONNECTION TRANSMITTED</h4>
                <p>Thank you. Your message has been received. I will review and get back to you shortly.</p>
              </div>
            ) : (
              <form style={styles.contactForm} onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>NAME</label>
                  <input type="text" required style={styles.formInput} placeholder="e.g. Christopher Nolan" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>EMAIL ADDRESS</label>
                  <input type="email" required style={styles.formInput} placeholder="e.g. director@studio.com" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>MESSAGE</label>
                  <textarea required rows={4} style={styles.formTextarea} placeholder="Detail your project or role proposal here..."></textarea>
                </div>
                <button type="submit" className="btn-primary" style={styles.formSubmitBtn}>
                  <Send size={14} style={{ marginRight: 8 }} />
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      )}


    </div>
  );
}

// Inline Styles (Maintains premium visual spacing and A24 design colors)
const styles = {
  hudNavbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5vw',
    backgroundColor: 'rgba(8, 8, 11, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 100,
  },
  hudLogo: {
    fontFamily: 'var(--font-inter)',
    fontSize: '1.4rem',
    fontWeight: 'normal',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    color: '#fff',
  },
  hudLogoImage: {
    height: '42px',
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
    cursor: 'pointer',
  },
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100px',
    overflow: 'hidden',
  },
  darkVeilBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    opacity: 0.75,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  heroGrid: {
    position: 'relative',
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '4rem',
    width: '100%',
    maxWidth: '1200px',
    alignItems: 'center',
  },
  heroTextContainer: {
    textAlign: 'left',
  },
  heroName: {
    fontSize: 'clamp(1.8rem, 6vw, 5.5rem)',
    fontWeight: 'normal',
    color: '#fff',
    lineHeight: '1.1',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-peacesans)',
    whiteSpace: 'nowrap',
  },
  rotatingTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80px',
    marginTop: '10px',
  },
  rotatingTextHeader: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    fontWeight: 'normal',
    color: 'var(--accent-violet)',
    lineHeight: '1.2',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-recoleta)',
    fontStyle: 'italic',
  },
  portraitContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitFrame: {
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
    aspectRatio: '3/4',
    border: 'none',
    padding: '0',
    background: 'none',
  },
  portraitImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(30%) contrast(110%)',
    transition: 'var(--transition-smooth)',
  },
  portraitOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(to bottom, transparent 60%, rgba(8, 8, 11, 0.7))',
    pointerEvents: 'none',
  },
  // Viewfinder Corner Markings
  viewfinderCornerTL: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '20px',
    height: '20px',
    borderTop: '2px solid rgba(255,255,255,0.4)',
    borderLeft: '2px solid rgba(255,255,255,0.4)',
  },
  viewfinderCornerTR: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '20px',
    height: '20px',
    borderTop: '2px solid rgba(255,255,255,0.4)',
    borderRight: '2px solid rgba(255,255,255,0.4)',
  },
  viewfinderCornerBL: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    width: '20px',
    height: '20px',
    borderBottom: '2px solid rgba(255,255,255,0.4)',
    borderLeft: '2px solid rgba(255,255,255,0.4)',
  },
  viewfinderCornerBR: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '20px',
    height: '20px',
    borderBottom: '2px solid rgba(255,255,255,0.4)',
    borderRight: '2px solid rgba(255,255,255,0.4)',
  },
  recDot: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ff4d4d',
    animation: 'pulse 1s infinite alternate',
  },
  recText: {
    position: 'absolute',
    top: '24px',
    left: '44px',
    fontSize: '0.65rem',
    fontFamily: 'monospace',
    letterSpacing: '1px',
    color: '#ff4d4d',
  },

  // SECTION 2: WHY CINEMA
  whyCinemaSection: {
    background: '#0a0a0f',
  },
  viewfinderWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '850px',
    border: '1px dashed rgba(255, 255, 255, 0.1)',
    padding: '4rem 3rem',
    background: 'rgba(12, 12, 16, 0.4)',
  },
  cameraBoxCornerTL: {
    position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '1px solid #fff', borderLeft: '1px solid #fff'
  },
  cameraBoxCornerTR: {
    position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: '1px solid #fff', borderRight: '1px solid #fff'
  },
  cameraBoxCornerBL: {
    position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: '1px solid #fff', borderLeft: '1px solid #fff'
  },
  cameraBoxCornerBR: {
    position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '1px solid #fff', borderRight: '1px solid #fff'
  },
  whyCinemaContent: {
    maxWidth: '650px',
    margin: '0 auto',
    textAlign: 'center',
  },
  whyCinemaText: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.75',
    fontWeight: '300',
    marginBottom: '3rem',
  },
  filmStripContainer: {
    borderTop: '1px solid var(--border-muted)',
    borderBottom: '1px solid var(--border-muted)',
    padding: '12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  filmStripSpockets: {
    height: '6px',
    background: 'repeating-linear-gradient(90deg, var(--text-dark), var(--text-dark) 8px, transparent 8px, transparent 16px)',
    opacity: '0.4',
  },
  filmStripFrames: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr 1fr',
    gap: '15px',
    height: '70px',
  },
  filmFrameSlot: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmFrameAspect: {
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    letterSpacing: '1px',
  },

  // COMMON SECTIONS
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionSubtitle: {
    fontSize: '0.75rem',
    color: 'var(--accent-gold)',
    letterSpacing: '0.25em',
    fontWeight: '600',
    display: 'block',
    marginBottom: '0.5rem',
  },
  sectionHeading: {
    fontSize: '2rem',
    color: '#fff',
    fontWeight: '500',
    marginBottom: '1rem',
  },
  sectionDesc: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    maxWidth: '550px',
    margin: '0 auto',
    lineHeight: '1.5',
  },

  // SECTION 3: GALLERY
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  galleryCard: {
    position: 'relative',
    cursor: 'pointer',
    border: '1px solid var(--border-muted)',
    background: '#0d0d12',
    overflow: 'hidden',
  },
  galleryImgContainer: {
    width: '100%',
    aspectRatio: '4/5',
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)',
  },
  galleryCardHover: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(8, 8, 12, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'var(--transition-fast)',
    padding: '20px',
    textAlign: 'center',
  },
  galleryCardCategory: {
    fontSize: '0.7rem',
    color: 'var(--accent-gold)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  galleryCardTitle: {
    fontSize: '1.25rem',
    color: '#fff',
    fontFamily: 'var(--font-cinematic)',
    fontWeight: '400',
    marginBottom: '15px',
  },
  galleryEnlargeBtn: {
    fontSize: '0.65rem',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '6px 12px',
    letterSpacing: '1px',
  },

  // SECTION 4: VIDEO EDITING
  videoRowsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  },
  videoRow: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    alignItems: 'stretch',
  },
  videoCard: {
    border: '1px solid var(--border-muted)',
    background: 'var(--bg-card)',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  videoThumbContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)',
  },
  videoPlayOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  playIconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(255,255,255,0.3)',
    transition: 'var(--transition-fast)',
  },
  videoMeta: {
    padding: '20px',
    textAlign: 'left',
  },
  videoTitle: {
    fontSize: '1.2rem',
    color: '#fff',
    marginBottom: '8px',
  },
  videoOneLiner: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },

  // SECTION 5: AI WORKFLOW INTERACTIVE PANEL
  interactiveWorkflowBox: {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1.2fr',
    gap: '3rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-muted)',
    padding: '2.5rem',
    marginTop: '3rem',
    minHeight: '450px',
  },
  workflowStepIndicator: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderRight: '1px solid var(--border-muted)',
    paddingRight: '2rem',
    textAlign: 'left',
  },
  workflowStepBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    padding: '12px 16px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'var(--transition-fast)',
  },
  workflowStepBtnActive: {
    background: 'var(--accent-gold-muted)',
    borderLeft: '2px solid var(--accent-gold)',
    color: 'var(--accent-gold)',
    padding: '12px 16px 12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontWeight: '600',
    transition: 'var(--transition-fast)',
  },
  btnStepNum: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    opacity: 0.8,
  },
  btnStepTitle: {
    fontFamily: 'var(--font-cinematic)',
    fontSize: '0.85rem',
    letterSpacing: '1px',
  },
  workflowStepDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'center',
    textAlign: 'left',
  },
  workflowIconHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--accent-gold)',
    marginBottom: '1rem',
  },
  workflowDetailsTitle: {
    fontSize: '1.5rem',
    fontFamily: 'var(--font-cinematic)',
    color: '#fff',
    letterSpacing: '1px',
  },
  workflowDetailsSubtitle: {
    display: 'block',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  workflowDetailsDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    fontWeight: '300',
  },
  workflowDetailsVisual: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    overflow: 'hidden',
    border: '1px solid var(--border-muted)',
  },
  workflowDetailsImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  workflowImgOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to right, rgba(8,8,11,0.5), transparent)',
  },
  workflowClosingNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    marginTop: '2.5rem',
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '1.5rem',
    border: '1px solid var(--border-muted)',
    textAlign: 'left',
  },
  infoIcon: {
    color: 'var(--accent-gold)',
    marginTop: '3px',
  },
  closingNoteText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },

  // SECTION 6: AI NATIVE GRID
  nativeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
    marginBottom: '4rem',
  },
  nativeCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-muted)',
    padding: '25px',
    textAlign: 'left',
    borderRadius: '2px',
    transition: 'var(--transition-smooth)',
  },
  nativeCardTitle: {
    fontSize: '1.1rem',
    color: '#fff',
    marginBottom: '10px',
  },
  goldLine: {
    width: '25px',
    height: '1px',
    backgroundColor: 'var(--accent-gold)',
    marginBottom: '15px',
  },
  nativeCardDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  toolsFooter: {
    borderTop: '1px solid var(--border-muted)',
    paddingTop: '3rem',
  },
  toolsTitle: {
    fontSize: '0.85rem',
    color: 'var(--accent-gold)',
    letterSpacing: '4px',
    marginBottom: '2rem',
  },
  toolsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  toolBadge: {
    background: '#0d0d12',
    border: '1px solid var(--border-muted)',
    padding: '10px 18px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    borderRadius: '2px',
  },
  toolName: {
    fontSize: '0.85rem',
    color: '#fff',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  toolCat: {
    fontSize: '0.65rem',
    color: 'var(--text-dark)',
  },

  // SECTION 7: TIMELINE / EXPERIENCE
  timelineWrapper: {
    width: '100%',
    maxWidth: '960px',
    margin: '0 auto',
    position: 'relative',
    textAlign: 'left',
  },
  experienceTimelineRow: {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1.2fr',
    gap: '3rem',
    marginBottom: '4rem',
    position: 'relative',
  },
  timelineSideLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  timelineLogoContainer: {
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  experienceCompany: {
    fontSize: '1.25rem',
    fontFamily: 'var(--font-cinematic)',
    color: 'var(--accent-gold)',
    letterSpacing: '2.5px',
  },
  timelineMainContent: {
    borderLeft: '1px solid var(--border-muted)',
    paddingLeft: '2.5rem',
  },
  experienceRole: {
    fontSize: '1.55rem',
    color: '#fff',
    marginBottom: '12px',
  },
  experienceDesc: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.65',
    fontStyle: 'italic',
  },

  // SECTION 8: BEYOND WORK
  beyondWorkGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    marginTop: '3rem',
    width: '100%',
  },
  beyondWorkCard: {
    flex: '1 1 450px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-muted)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'var(--transition-smooth)',
    textAlign: 'left',
  },
  beyondWorkThumbContainer: {
    position: 'relative',
    overflow: 'hidden',
    background: '#0c0c10',
    width: '100%',
    aspectRatio: '4/5',
  },
  beyondWorkThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'var(--transition-smooth)',
  },
  platformIconOverlay: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    border: '1px solid var(--border-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backdropFilter: 'blur(4px)',
  },
  beyondWorkMeta: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flexGrow: 1,
  },
  beyondWorkCardTitle: {
    fontSize: '1.3rem',
    fontFamily: 'var(--font-cinematic)',
    color: '#fff',
  },
  beyondWorkCardRole: {
    fontSize: '0.75rem',
    color: 'var(--accent-gold)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  beyondWorkCardDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    fontWeight: '300',
  },
  beyondWorkFooter: {
    marginTop: '4rem',
    width: '100%',
    textAlign: 'center',
  },
  beyondWorkFooterText: {
    fontSize: '0.85rem',
    color: 'var(--text-dark)',
    fontStyle: 'italic',
    letterSpacing: '0.5px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },

  // SECTION 9: MILESTONES SLIDESHOW
  slideshowContainer: {
    width: '100%',
    maxWidth: '750px',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid var(--border-muted)',
    padding: '8px',
    background: '#0d0d12',
  },
  slideFrame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
  },
  slideImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  slideInfoOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
    padding: '30px',
    textAlign: 'left',
  },
  slideCounter: {
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    color: 'var(--accent-gold)',
    marginBottom: '5px',
    display: 'block',
  },
  slideCaption: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    fontWeight: '300',
  },
  slideshowControls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px',
    padding: '10px 0',
  },
  slideshowBtn: {
    background: 'none',
    border: '1px solid var(--border-muted)',
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },

  // SECTION 10: FINAL SECTION
  finalSection: {
    background: 'transparent',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalContainer: {
    maxWidth: '750px',
    textAlign: 'center',
  },
  finalHeading: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    color: '#fff',
    marginBottom: '2rem',
  },
  finalText: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    marginBottom: '3rem',
    fontWeight: '300',
  },
  finalCtaGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  finalBtn: {
    minWidth: '200px',
  },

  // FOOTER
  footer: {
    borderTop: '1px solid var(--border-muted)',
    padding: '30px 5vw',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'var(--text-dark)',
    fontSize: '0.7rem',
    letterSpacing: '1px',
    background: '#000',
  },
  footerText: {
    textAlign: 'left',
  },
  footerAspect: {
    fontFamily: 'monospace',
  },

  // COMMON MODAL STRUCTURES
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '-35px',
    right: '0',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },

  // LIGHTBOX
  lightboxContent: {
    position: 'relative',
    maxWidth: '800px',
    width: '100%',
    background: '#0a0a0f',
    border: '1px solid var(--border-muted)',
    padding: '8px',
  },
  lightboxImg: {
    width: '100%',
    aspectRatio: '4/5',
    maxHeight: '75vh',
    objectFit: 'contain',
    background: '#000',
  },
  lightboxMeta: {
    padding: '15px',
    textAlign: 'left',
  },
  lightboxCategory: {
    fontSize: '0.75rem',
    color: 'var(--accent-gold)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  lightboxTitle: {
    fontSize: '1.2rem',
    color: '#fff',
    marginTop: '5px',
  },

  // SCREENER VIDEO PLAYER
  videoPlayerContent: {
    position: 'relative',
    maxWidth: '1200px',
    width: '92vw',
    maxHeight: '92vh',
    background: '#000000',
    border: '1px solid rgba(255,255,255,0.15)',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    marginBottom: '10px',
    letterSpacing: '1px',
  },
  screenerBadge: {
    color: 'var(--accent-gold)',
  },
  timecode: {
    background: '#1a1a24',
    padding: '2px 8px',
    borderRadius: '2px',
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: '16/9',
    background: '#000',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  screenerVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  screenerFooter: {
    textAlign: 'left',
    marginTop: '15px',
  },
  screenerTitle: {
    color: '#fff',
    fontSize: '1.25rem',
    marginBottom: '5px',
  },
  screenerDesc: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    lineHeight: '1.5',
  },

  // CONTACT DIALOG
  contactContent: {
    position: 'relative',
    maxWidth: '450px',
    width: '100%',
    background: '#0d0d12',
    border: '1px solid var(--border-muted)',
    padding: '30px',
    borderRadius: '2px',
    textAlign: 'left',
  },
  contactTitle: {
    fontSize: '1.3rem',
    color: '#fff',
    marginBottom: '8px',
    letterSpacing: '2px',
  },
  contactDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formLabel: {
    fontSize: '0.65rem',
    color: 'var(--accent-gold)',
    letterSpacing: '1px',
    fontWeight: '600',
  },
  formInput: {
    background: '#161622',
    border: '1px solid var(--border-muted)',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    borderRadius: '2px',
    outline: 'none',
  },
  formTextarea: {
    background: '#161622',
    border: '1px solid var(--border-muted)',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    borderRadius: '2px',
    outline: 'none',
    resize: 'none',
  },
  formSubmitBtn: {
    marginTop: '10px',
    width: '100%',
  },
  contactSuccess: {
    textAlign: 'center',
    padding: '20px 0',
  },

  // VIEW RESUME MODAL
  resumeContent: {
    position: 'relative',
    maxWidth: '550px',
    width: '100%',
    background: '#0d0d12',
    border: '1px solid var(--border-muted)',
    padding: '30px',
    borderRadius: '2px',
    textAlign: 'left',
  },
  resumeTitle: {
    fontSize: '1.4rem',
    color: '#fff',
    letterSpacing: '2px',
  },
  resumeSubtitle: {
    fontSize: '0.75rem',
    color: 'var(--accent-gold)',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '20px',
  },
  resumeScrollArea: {
    maxHeight: '350px',
    overflowY: 'auto',
    paddingRight: '10px',
    borderTop: '1px solid var(--border-muted)',
    borderBottom: '1px solid var(--border-muted)',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  resumeSectionBlock: {
    marginBottom: '25px',
  },
  resumeSecHeader: {
    fontSize: '0.85rem',
    color: 'var(--accent-gold)',
    letterSpacing: '2px',
    marginBottom: '10px',
    fontWeight: '600',
  },
  resumeSecText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    fontWeight: '300',
  },
  resumeSubBlock: {
    marginBottom: '15px',
  },
  resumeDuration: {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: 'var(--text-dark)',
  },
  resumeJobTitle: {
    fontSize: '0.95rem',
    color: '#fff',
    margin: '3px 0 6px 0',
  },
  resumeJobDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    fontWeight: '300',
  },
  resumeFooterAction: {
    marginTop: '20px',
    textAlign: 'center',
  },
  resumeDownloadBtn: {
    width: '100%',
  },
  imageGridContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    marginTop: '2.5rem',
  },
  row1: {
    display: 'flex',
    gap: '15px',
    width: '100%',
  },
  row1Image: {
    flex: 1,
    width: 0,
    aspectRatio: '9/16',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)',
    filter: 'contrast(102%)',
  },
  row2: {
    display: 'flex',
    gap: '15px',
    width: '100%',
  },
  row2Image: {
    flex: 1,
    width: 0,
    aspectRatio: '16/9',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)',
    filter: 'contrast(102%)',
  },
  // CASE STUDY STYLE TOKENS
  caseStudyFlow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
    marginTop: '60px',
    width: '100%',
  },
  caseStudyBlock: {
    background: 'rgba(12, 12, 16, 0.4)',
    border: '1px solid var(--border-muted)',
    borderRadius: '4px',
    padding: '4rem 3rem',
    textAlign: 'left',
    width: '100%',
  },
  // CASE STUDY STYLE TOKENS
  caseStudyGrid: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '30px',
    width: '100%',
    marginTop: '20px',
  },
  caseStudySidebarCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    paddingBottom: '20px',
    borderRight: '1px solid var(--border-muted)',
    paddingRight: '20px',
  },
  caseStudyContentCol: {
    flex: 1,
    position: 'relative',
    background: 'rgba(12, 12, 16, 0.4)',
    border: '1px solid var(--border-muted)',
    borderRadius: '4px',
    padding: '24px',
    minHeight: '450px',
  },
  slideHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderBottom: '1px solid var(--border-muted)',
    paddingBottom: '12px',
    marginBottom: '20px',
  },
  slideNum: {
    fontSize: '0.7rem',
    color: 'var(--accent-violet)',
    letterSpacing: '1.5px',
    fontWeight: 'bold',
  },
  slideTitle: {
    fontSize: '1.4rem',
    color: '#fff',
    letterSpacing: '0.5px',
  },
  briefLayout: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '30px',
    alignItems: 'start',
  },
  rulesBox: {
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px dashed rgba(255, 255, 255, 0.05)',
    padding: '15px',
    borderRadius: '4px',
  },
  ruleLiItem: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.3',
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
  },
  ruleLiItemNum: {
    color: 'var(--accent-violet)',
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    padding: '0 4px',
    borderRadius: '2px',
    background: 'rgba(139, 92, 246, 0.05)',
  },
  approachHighlightBlock: {
    borderLeft: '3px solid var(--accent-violet)',
    paddingLeft: '15px',
    marginTop: '10px',
    fontStyle: 'italic',
  },
  slideImageFrame: {
    position: 'relative',
    width: '100%',
    height: '320px',
    background: '#0d0d12',
    border: '1px solid var(--border-muted)',
    overflow: 'hidden',
  },
  slideImgElement: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    opacity: 0.85,
  },
  resultBadgeMini: {
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.01) 100%)',
    border: '1px solid rgba(139, 92, 246, 0.15)',
    padding: '15px',
    borderRadius: '4px',
    marginTop: 'auto',
  },
  resultBadgeMiniTag: {
    display: 'inline-block',
    fontSize: '0.55rem',
    color: 'var(--accent-violet)',
    background: 'rgba(139, 92, 246, 0.08)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    padding: '2px 6px',
    borderRadius: '2px',
    letterSpacing: '1px',
    fontWeight: 'bold',
  }
};

export default App;
