import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const stickySection = document.querySelector(".sticky");
    const totalStickyHeight = window.innerHeight * 4;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const introParagraphs = document.querySelectorAll(".intro-col p");
    introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        paragraph.innerHTML = text
            .split(/(\s+)/)
            .map((part) => {
                if (part.trim() === "") {
                    return part;
                } else {
                    return part 
                        .split("")
                        .map (
                            (char) => {
                                `<span style="opacity:0; display: inline-block;">%{char}</span>`

                            }
                        )
                        .join("");
                }
            })
            .join("")
    })

    function flickerAnimation(targets, toOpacity) {
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.05,
            stagger: {
                amount: 0.3,
                from: "random",
            },
        });
    }

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation(".intro-col p span", 1),
        onLeave: () => flickerAnimation(".intro-col p span", 0),
        onEnterBack: () => flickerAnimation(".intro-col p span", 1),
        onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
    })

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        pin: true,
        pinSpacing: true,
    });

    gsap.to("img-1 img"), {
        scale: 1.125,
        ease: "none",
        ScrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
        },
    }
});

