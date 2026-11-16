
/* =========================================
   SANTIAGO BERNABÉU SHOWCASE
   JavaScript functionality
========================================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});


// CLOSE MENU WHEN ESCAPE IS PRESSED

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ANIMATED STATISTICS

const statNumbers = document.querySelectorAll(".stat-number");

function animateCounter(element) {

    const target = Number(element.dataset.count);

    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        // Ease-out animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            easedProgress * target
        );

        element.textContent = currentValue.toLocaleString("en-US");

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString("en-US");
        }

    }

    requestAnimationFrame(updateCounter);
}


if ("IntersectionObserver" in window) {

    const statsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

} else {

    statNumbers.forEach(stat => {
        stat.textContent = Number(stat.dataset.count).toLocaleString("en-US");
    });

}


// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isCurrentlyActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach(faqItem => {

            faqItem.classList.remove("active");

            faqItem.querySelector(".faq-question")
                .setAttribute("aria-expanded", "false");

        });

        // Open clicked item if it was previously closed
        if (!isCurrentlyActive) {

            item.classList.add("active");

            question.setAttribute("aria-expanded", "true");

        }

    });

});


// FOOTER YEAR

const footerCopyright = document.querySelector(".footer-bottom p");

if (footerCopyright) {
    footerCopyright.textContent =
        `© ${new Date().getFullYear()} SANTIAGO BERNABÉU SHOWCASE. INDEPENDENT FRONT-END CONCEPT PROJECT.`;
}
