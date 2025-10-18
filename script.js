// Data model for the checklist aligned with the lecture outline.
const checklistData = [
    {
        chapter: "Chapter 2: Quantum Mechanics Revision",
        summary: "Operators, eigenstates, and the structure of Hilbert spaces",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Operators", detail: "Understand that observables are represented by linear Hermitian operators." },
                    { label: "Eigenfunctions & Eigenvalues", detail: "The result of a measurement can only be an eigenvalue of the corresponding operator." },
                    { label: "Degeneracy", detail: "Multiple eigenfunctions can share the same eigenvalue." },
                    { label: "Expectation Values & Matrix Elements", detail: "Know how to calculate the average outcome of a measurement." },
                    { label: "Hermitian Operators", detail: "Review their properties (real eigenvalues) and why they are important for observables." },
                    { label: "Orthogonality & Completeness", detail: "Eigenfunctions form orthogonal bases so any wavefunction is a linear combination of them." },
                    { label: "Commuting & Non-Commuting Operators", detail: "Commuting operators share common eigenfunctions; non-commuting operators signal an uncertainty relation." },
                    { label: "Schrodinger's Equation", detail: "Recall the time evolution equation for quantum states." },
                    { label: "Good Quantum Numbers", detail: "Labels tied to operators that commute with the Hamiltonian and represent conserved quantities." },
                    { label: "Angular Momentum", detail: "Keep track of orbital angular momentum L, its commutation relations, and intrinsic spin S." },
                    { label: "Multi-Electron Wavefunctions", detail: "Electrons are indistinguishable fermions requiring antisymmetric total wavefunctions and enforcing the Pauli principle." }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Eigenvalue Equation", type: "equation", detail: "\\hat{O}\\psi(x) = \\lambda\\psi(x)" },
                    { label: "Matrix Element / Bra-Ket Notation", type: "equation", detail: "\\langle\\psi_i|\\hat{O}|\\psi_j\\rangle = \\int \\psi_i^*(x) \\hat{O} \\psi_j(x) dx" },
                    { label: "Commutator", type: "equation", detail: "[\\hat{O}, \\hat{M}] = \\hat{O}\\hat{M} - \\hat{M}\\hat{O}" },
                    { label: "Heisenberg's Uncertainty Principle", type: "equation", detail: "\\Delta O \\Delta M \\ge \\tfrac{1}{2}|\\langle[\\hat{O},\\hat{M}]\\rangle|" },
                    { label: "Time-Dependent Schrodinger Equation", type: "equation", detail: "\\hat{H}\\psi = i\\hbar\\tfrac{\\partial}{\\partial t}\\psi" },
                    { label: "Angular Momentum Eigenvalues", type: "equation", detail: [
                        "\\hat{L}^2 Y_{lm}(\\theta, \\phi) = \\hbar^2 l(l+1) Y_{lm}(\\theta, \\phi)",
                        "\\hat{L}_z Y_{lm}(\\theta, \\phi) = \\hbar m Y_{lm}(\\theta, \\phi)"
                    ] }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 3: The Hydrogen Atom",
        summary: "Solutions to the Coulomb potential and hydrogenic structure",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Central Potential", detail: "Recognise that the Coulomb potential V(r) is spherically symmetric." },
                    { label: "Separation of Variables", detail: "Use \\psi(r, \\theta, \\phi) = R(r)Y(\\theta, \\phi) thanks to the central potential." },
                    { label: "Radial Equation", detail: "Track the differential equation governing the radial part R(r)." },
                    { label: "Quantum Numbers", detail: "Understand principal n, orbital l, and magnetic m along with their allowed ranges." },
                    { label: "Radial Probability Density", detail: "Plot P_{nl}(r) = r^2|R_{nl}(r)|^2 for n = 1, 2, 3 to interpret spatial distributions." },
                    { label: "Accidental Degeneracy", detail: "Energy levels depend only on n in a pure 1/r potential, independent of l." },
                    { label: "Rydberg Formula", detail: "Connect the spectral lines to transitions in hydrogen." }
                ]
            },
            {
                title: "Key Derivations",
                items: [
                    { label: "Solving the Schrodinger Equation", detail: "Rehearse separating variables, solving the radial equation, and obtaining hydrogen energy levels.", derivation: [
                        { type: "text", text: "The goal is to solve the time-independent Schrodinger equation for an electron in the hydrogen atom under the Coulomb potential." },
                        { type: "heading", text: "Starting Point: The Hamiltonian" },
                        { type: "equation", tex: "\\hat{H} = -\\frac{\\hbar^2}{2\\mu}\\nabla^2 - \\frac{e^2}{4\\pi\\epsilon_0 r}", display: true },
                        { type: "text", text: "Here, $\\mu$ is the reduced mass of the electron-proton system and the eigenvalue problem is $\\hat{H}\\psi = E\\psi$." },
                        { type: "heading", text: "Step 1: Separation of Variables" },
                        { type: "text", text: "Because the Coulomb potential depends only on $r$, adopt spherical coordinates and separate the wavefunction into radial and angular parts." },
                        { type: "equation", tex: "\\psi(r, \\theta, \\phi) = R(r)Y(\\theta, \\phi)", display: true },
                        { type: "text", text: "Substituting this ansatz into the Schrodinger equation yields independent equations for the radial function $R(r)$ and the angular function $Y(\\theta, \\phi)$." },
                        { type: "heading", text: "Step 2: The Angular Equation" },
                        { type: "equation", tex: "\\hat{L}^2 Y(\\theta, \\phi) = \\hbar^2 l(l+1) Y(\\theta, \\phi)", display: true },
                        { type: "text", text: "The solutions are the spherical harmonics $Y_{lm}(\\theta, \\phi)$, with quantum numbers $l$ and $m$ restricted to integers to ensure well-behaved wavefunctions." },
                        { type: "heading", text: "Step 3: The Radial Equation" },
                        { type: "equation", tex: "\\left[-\\frac{\\hbar^2}{2\\mu}\\frac{1}{r^2}\\frac{d}{dr}\\left(r^2 \\frac{d}{dr}\\right) - \\frac{e^2}{4\\pi\\epsilon_0 r} + \\frac{\\hbar^2 l(l+1)}{2\\mu r^2}\\right]R(r) = ER(r)", display: true },
                        { type: "text", text: "The final term acts as a centrifugal barrier that increases with angular momentum and suppresses the wavefunction near the origin." },
                        { type: "heading", text: "Step 4: Solving the Radial Equation" },
                        { type: "list", items: [
                            "Asymptotic analysis: for large $r$ the potential terms vanish, so bound states require $R(r)$ to decay exponentially.",
                            "Power series: write $R(r) = u(r) e^{-r/a}$ and solve for the series coefficients of $u(r)$.",
                            "Termination condition: the series must truncate to maintain normalisability, linking the energy to a positive integer $n$."
                        ]},
                        { type: "heading", text: "Result: Quantized Energy" },
                        { type: "equation", tex: "E_n = -\\frac{\\mu e^4}{2(4\\pi\\epsilon_0)^2\\hbar^2}\\frac{1}{n^2}", display: true },
                        { type: "text", text: "This reproduces the Bohr energy levels with $n$ the principal quantum number governing each bound state." }
                    ] }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Time-Independent Schrodinger Equation", type: "equation", detail: "\\left[-\\tfrac{\\hbar^2}{2\\mu}\\nabla^2 - \\tfrac{e^2}{4\\pi\\epsilon_0 r}\\right]\\psi(r) = E\\psi(r)" },
                    { label: "Energy Levels", type: "equation", detail: "E_n = -\\tfrac{\\mu e^4}{2(4\\pi\\epsilon_0)^2\\hbar^2}\\tfrac{1}{n^2} \approx -\\tfrac{13.6}{n^2} \text{ eV}" },
                    { label: "Bohr Radius", type: "equation", detail: "a_0 = \\tfrac{4\\pi\\epsilon_0\\hbar^2}{\\mu e^2}" },
                    { label: "Allowed Quantum Numbers", type: "equation", detail: [
                        "n = 1, 2, 3, ...",
                        "l = 0, 1, ..., n-1",
                        "m = -l, ..., 0, ..., +l"
                    ] },
                    { label: "Full Wavefunction", type: "equation", detail: "\\psi_{nlm}(r, \\theta, \\phi) = R_{nl}(r)Y_{lm}(\\theta, \\phi)" }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 4: Time-Independent Perturbation Theory",
        summary: "Approximations around solvable Hamiltonians",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Perturbation Theory Goal", detail: "Approximate the physics when the Hamiltonian differs slightly from a solvable system." },
                    { label: "Non-Degenerate vs. Degenerate", detail: "Identify when energy levels are degenerate to choose the right perturbative strategy." },
                    { label: "Stark Effect", detail: "Understand linear versus quadratic Stark shifts from an external electric field." }
                ]
            },
            {
                title: "Key Derivations",
                items: [
                    { label: "Non-Degenerate Corrections", detail: "Derive the first-order energy and wavefunction corrections plus second-order energy shifts.", derivation: [
                        { type: "text", text: "Split the Hamiltonian into a solvable part and a small perturbation, keeping track of the perturbation strength with a bookkeeping parameter $\\lambda$." },
                        { type: "equation", tex: "\\hat{H} = \\hat{H}_0 + \\lambda \\hat{H}_p", display: true },
                        { type: "text", text: "Assume that the exact energies and eigenfunctions can be expanded in a power series in $\\lambda$ around the unperturbed solutions." },
                        { type: "equation", tex: "E'_j = E_j + \\lambda E_j^{(1)} + \\lambda^2 E_j^{(2)} + \dots", display: true },
                        { type: "equation", tex: "\\psi'_j = \\psi_j + \\lambda \\psi_j^{(1)} + \\lambda^2 \\psi_j^{(2)} + \dots", display: true },
                        { type: "heading", text: "First-Order Energy Correction" },
                        { type: "text", text: "Insert the series into the perturbed Schrodinger equation and collect the terms proportional to $\\lambda$." },
                        { type: "equation", tex: "\\hat{H}_0 \\psi_j^{(1)} + \\hat{H}_p \\psi_j = E_j \\psi_j^{(1)} + E_j^{(1)} \\psi_j", display: true },
                        { type: "text", text: "Project onto the bra $\\langle \\psi_j|$ to exploit orthonormality and the Hermiticity of $\\hat{H}_0$, eliminating the unknown overlap." },
                        { type: "equation", tex: "E_j^{(1)} = \\langle \\psi_j| \\hat{H}_p | \\psi_j \\rangle", display: true },
                        { type: "heading", text: "First-Order Wavefunction Correction" },
                        { type: "text", text: "Project the same equation onto a different unperturbed state $\\psi_k$ with $k \\ne j$ to isolate the off-diagonal components." },
                        { type: "equation", tex: "\\langle \\psi_k| \\psi_j^{(1)} \\rangle = \\frac{\\langle \\psi_k| \\hat{H}_p | \\psi_j \\rangle}{E_j - E_k}", display: true },
                        { type: "text", text: "These overlaps determine the first-order correction to the eigenfunction as a superposition of the other unperturbed states." },
                        { type: "heading", text: "Second-Order Energy Correction" },
                        { type: "text", text: "Collect the terms proportional to $\\lambda^2$ and apply the same projection strategy to find the next correction to the energy." },
                        { type: "equation", tex: "E_j^{(2)} = \\sum_{k \\ne j} \\frac{| \\langle \\psi_k| \\hat{H}_p | \\psi_j \\rangle |^2}{E_j - E_k}", display: true },
                        { type: "text", text: "Each term shows how strongly the perturbation couples state j to the other states in the spectrum." }
                    ] },
                    { label: "Degenerate Case", detail: "Diagonalise the perturbation within the degenerate subspace before applying corrections.", derivation: [
                        { type: "text", text: "When two or more unperturbed states share the same energy $E_D$, the denominators in the non-degenerate formulas vanish and the naive expansion fails." },
                        { type: "heading", text: "Construct the Degenerate Subspace" },
                        { type: "text", text: "Let $\\{\\psi_a, \\psi_b, ...\\}$ span the degenerate eigenspace of $\\hat{H}_0$. Seek the correct zeroth-order basis as linear combinations of these states." },
                        { type: "equation", tex: "\\psi = c_a \\psi_a + c_b \\psi_b + \dots", display: true },
                        { type: "heading", text: "Perturbation Matrix" },
                        { type: "text", text: "Project the first-order equation onto each member of the degenerate subspace to build the perturbation matrix $W$." },
                        { type: "equation", tex: "W_{mn} = \\langle \\psi_m| \\hat{H}_p | \\psi_n \\rangle", display: true },
                        { type: "heading", text: "Diagonalise the Matrix" },
                        { type: "equation", tex: "W \\vec{c} = E^{(1)} \\vec{c}", display: true },
                        { type: "text", text: "The eigenvalues $E^{(1)}$ supply the first-order energy shifts, while the eigenvectors give the coefficients that define the good zeroth-order states." },
                        { type: "heading", text: "Proceed with Refined States" },
                        { type: "text", text: "Once the degeneracy is resolved, each new basis state behaves like a non-degenerate level and higher-order corrections follow the standard formulas." }
                    ] }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "First-Order Energy Correction", type: "equation", detail: "E_j^{(1)} = \\langle\\psi_j|\\hat{H}_p|\\psi_j\\rangle" },
                    { label: "First-Order Wavefunction Correction", type: "equation", detail: "\\psi_j^{(1)} = \\sum_{k \\ne j} \\tfrac{\\langle\\psi_k|\\hat{H}_p|\\psi_j\\rangle}{E_j - E_k} \\psi_k" },
                    { label: "Second-Order Energy Correction", type: "equation", detail: "E_j^{(2)} = \\sum_{k \\ne j} \\tfrac{|\\langle\\psi_k|\\hat{H}_p|\\psi_j\\rangle|^2}{E_j - E_k}" },
                    { label: "Stark Effect Perturbation", type: "equation", detail: "\\hat{H}_p = -e\\vec{d} \\cdot \\vec{E}_{ext} = eEz = eEr\\cos\\theta" }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 5: Fine Structure of the Hydrogen Atom",
        summary: "Relativistic and spin-orbit corrections to hydrogen",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Origin of Fine Structure", detail: "Track relativistic and spin-related corrections beyond the Coulomb model." },
                    { label: "Spin-Orbit Coupling", detail: "Understand the interaction between the electron's magnetic moment and the orbital magnetic field." },
                    { label: "Total Angular Momentum", detail: "Use J = L + S as the conserved quantity when spin-orbit coupling is included." },
                    { label: "Addition of Angular Momenta", detail: "Apply the rules for possible j values when combining L and S." },
                    { label: "Term Symbols", detail: "Interpret n^{2S+1}L_J spectroscopic notation for atomic states." },
                    { label: "Relativistic Mass Correction", detail: "Account for corrections to the kinetic energy term." },
                    { label: "Darwin Correction", detail: "Remember the zitterbewegung contribution for s-states." }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Spin-Orbit Hamiltonian", type: "equation", detail: "\\hat{H}_{so} \\propto \\hat{L} \\cdot \\hat{S} = \\tfrac{1}{2}(\\hat{J}^2 - \\hat{L}^2 - \\hat{S}^2)" },
                    { label: "Fine Structure Constant", type: "equation", detail: "\\alpha = \\tfrac{e^2}{4\\pi\\epsilon_0\\hbar c} \\approx \\tfrac{1}{137}" },
                    { label: "Total Fine Structure Shift", type: "equation", detail: "E_{fs}^{(1)} = -\\tfrac{\\alpha^2 E_n^{(0)}}{n^2} \\left[ \\tfrac{3}{4} - \\tfrac{n}{j+\\tfrac{1}{2}} \\right]" }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 6: Interaction of Atoms & E-M Waves",
        summary: "Time-dependent perturbations and selection rules",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Time-Dependent Perturbation Theory", detail: "Apply it to absorption and emission processes." },
                    { label: "Einstein's A and B Coefficients", detail: "Contrast spontaneous emission with stimulated emission and absorption." },
                    { label: "Fermi's Golden Rule", detail: "Use it to compute transition rates induced by perturbations." },
                    { label: "Dipole Approximation", detail: "Assume the electric field is uniform across the atom for E1 transitions." },
                    { label: "Selection Rules", detail: "Remember the dipole-allowed changes in quantum numbers." }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Einstein Coefficient Relations", type: "equation", detail: "B_{12} = B_{21},\\quad \\tfrac{A_{21}}{B_{21}} = \\tfrac{\\hbar\\omega^3}{\\pi^2 c^3}" },
                    { label: "Transition Rate", type: "equation", detail: "W_{nj} \\propto |\\langle\\psi_n|\\hat{H}_p|\\psi_j\\rangle|^2" },
                    { label: "Dipole Perturbation", type: "equation", detail: "\\hat{H}_p(t) = -e\\vec{r} \\cdot \\vec{E}\\cos(\\omega t)" },
                    { label: "Dipole Selection Rules", type: "equation", detail: [
                        "\\Delta l = \\pm 1",
                        "\\Delta m_l = 0, \\pm 1",
                        "\\Delta s = 0"
                    ] }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 7: Two-Electron Atoms",
        summary: "Helium-like systems and exchange effects",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Electron-Electron Repulsion", detail: "Recognise the \\tfrac{e^2}{4\\pi\\epsilon_0|r_1 - r_2|} term preventing analytic solutions." },
                    { label: "Perturbation Approach", detail: "Treat electron-electron repulsion as a perturbation on independent hydrogenic ions." },
                    { label: "Direct vs. Exchange Energy", detail: "Differentiate classical-like Coulomb repulsion from the exchange contribution due to symmetry." },
                    { label: "Singlet vs. Triplet States", detail: "Connect total spin S with spatial symmetry and resulting energy differences." },
                    { label: "Screening", detail: "Account for the effective nuclear charge felt by outer electrons." }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Helium Hamiltonian", type: "equation", detail: "\\hat{H} = \\hat{H}_1 + \\hat{H}_2 + \\tfrac{e^2}{4\\pi\\epsilon_0|r_1-r_2|}" },
                    { label: "First-Order Energy Shift", type: "equation", detail: "\\Delta E^{(1)} = E_{direct} \\pm E_{exchange}" },
                    { label: "Optical Selection Rules", type: "equation", detail: "\\Delta S = 0,\\quad \\text{one electron transitions at a time}" }
                ]
            }
        ]
    },
    {
        chapter: "Chapter 8: Multi-Electron Atoms",
        summary: "Central fields, coupling schemes, and spectroscopy",
        sections: [
            {
                title: "Key Concepts",
                items: [
                    { label: "Central Field Approximation", detail: "Model each electron in a spherically symmetric average potential." },
                    { label: "Self-Consistent Field", detail: "Iteratively solve for orbitals in the Hartree approach." },
                    { label: "Periodic Table", detail: "Explain shell filling (n, l) ordering and screening effects such as 4s preceding 3d." },
                    { label: "LS Coupling", detail: "Use Russell-Saunders coupling where electrostatic interactions dominate spin-orbit." },
                    { label: "Hund's Rules", detail: "Apply the empirical rules for ground-state term symbols." },
                    { label: "Zeeman Effect", detail: "Contrast normal and anomalous Zeeman splitting via the Lande g-factor." }
                ]
            },
            {
                title: "Key Equations",
                items: [
                    { label: "Term Symbol", type: "equation", detail: "^{2S+1}L_J" },
                    { label: "Zeeman Perturbation", type: "equation", detail: "\\hat{H}_{Zeeman} = -\\vec{\\mu} \\cdot \\vec{B} = \\tfrac{\\mu_B}{\\hbar}(\\hat{L}_z + g_s\\hat{S}_z)B" },
                    { label: "Weak-Field Zeeman Shift", type: "equation", detail: "\\Delta E = g_J \\mu_B M_J B" },
                    { label: "Lande g-factor", type: "equation", detail: "g_J = 1 + \\tfrac{J(J+1) + S(S+1) - L(L+1)}{2J(J+1)}" },
                    { label: "Optical Selection Rules", type: "equation", detail: [
                        "\\Delta S = 0",
                        "\\Delta L = 0, \\pm 1 (\\text{but } 0 \\not\\to 0)",
                        "\\Delta J = 0, \\pm 1 (\\text{but } 0 \\not\\to 0)"
                    ] }
                ]
            }
        ]
    }
];

const storageKey = "atomic-checklist-state-v1";

document.addEventListener("DOMContentLoaded", () => {
    const checklistContainer = document.getElementById("checklist");
    const overallProgressEl = document.getElementById("overall-progress");
    const resetButton = document.getElementById("reset-progress");

    if (!checklistContainer || !overallProgressEl || !resetButton) {
        return;
    }

    const chaptersMeta = [];
    const state = loadState();

    checklistData.forEach((chapter) => {
        const chapterSlug = slugify(chapter.chapter);
        const chapterCard = document.createElement("article");
        chapterCard.className = "chapter-card";

        const chapterContent = document.createElement("div");
        chapterContent.className = "chapter-content";

        const header = document.createElement("div");
        header.className = "chapter-header";

        const headerText = document.createElement("div");
        headerText.className = "chapter-text";

        const titleEl = document.createElement("h2");
        titleEl.className = "chapter-title";
        titleEl.textContent = chapter.chapter;

        const summaryEl = document.createElement("p");
        summaryEl.className = "chapter-meta";
        summaryEl.textContent = chapter.summary;

        headerText.append(titleEl, summaryEl);

        const progressWrap = document.createElement("div");
        progressWrap.className = "chapter-progress";

        const progressPercent = document.createElement("span");
        progressPercent.className = "chapter-progress-percent";
        progressPercent.textContent = "0%";

        const progressCount = document.createElement("span");
        progressCount.className = "chapter-progress-count";
        progressCount.textContent = "0 of 0 complete";

        progressWrap.append(progressPercent, progressCount);

        header.append(headerText, progressWrap);

        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        const progressFill = document.createElement("div");
        progressFill.className = "progress-bar-fill";
        progressBar.append(progressFill);

        const sectionsWrap = document.createElement("div");
        sectionsWrap.className = "chapter-sections";

        const meta = {
            slug: chapterSlug,
            items: [],
            fillEl: progressFill,
            percentEl: progressPercent,
            countEl: progressCount
        };

        chapter.sections.forEach((section) => {
            const sectionEl = document.createElement("section");
            sectionEl.className = "check-section";

            const sectionTitle = document.createElement("h3");
            sectionTitle.className = "section-title";
            sectionTitle.textContent = section.title;

            const itemsList = document.createElement("div");
            itemsList.className = "checklist-items";

            section.items.forEach((item) => {
                const { element, key, checkbox } = createChecklistItem({
                    chapterSlug,
                    sectionTitle: section.title,
                    item,
                    state
                });
                meta.items.push({ key, checkbox, element });
                itemsList.appendChild(element);
            });

            sectionEl.append(sectionTitle, itemsList);
            sectionsWrap.appendChild(sectionEl);
        });

        chapterContent.append(header, progressBar, sectionsWrap);
        chapterCard.appendChild(chapterContent);
        checklistContainer.appendChild(chapterCard);
        chaptersMeta.push(meta);
    });

    chaptersMeta.forEach((meta) => updateChapterProgress(meta));
    updateOverallProgress();

    if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise().catch((error) => {
            console.warn("MathJax rendering failed", error);
        });
    }

    resetButton.addEventListener("click", () => {
        if (!window.confirm("Reset all checklist progress?")) {
            return;
        }
        clearState();
        stateKeys(state).forEach((key) => delete state[key]);
        chaptersMeta.forEach((meta) => {
            meta.items.forEach(({ key, checkbox, element }) => {
                checkbox.checked = false;
                element.dataset.checked = "false";
                delete state[key];
            });
            updateChapterProgress(meta);
        });
        saveState(state);
        updateOverallProgress();
    });

    function updateOverallProgress() {
        const totals = chaptersMeta.reduce((acc, meta) => {
            const checked = meta.items.filter(({ checkbox }) => checkbox.checked).length;
            acc.checked += checked;
            acc.total += meta.items.length;
            return acc;
        }, { checked: 0, total: 0 });

        const percent = totals.total ? Math.round((totals.checked / totals.total) * 100) : 0;
        overallProgressEl.textContent = `${percent}%`;
    }

    function updateChapterProgress(meta) {
        const total = meta.items.length;
        const checked = meta.items.filter(({ checkbox }) => checkbox.checked).length;
        const percent = total ? Math.round((checked / total) * 100) : 0;

        meta.fillEl.style.width = `${percent}%`;
        meta.percentEl.textContent = `${percent}%`;
        meta.countEl.textContent = `${checked} of ${total} complete`;
    }

    function handleToggle(meta, entry) {
        entry.element.dataset.checked = entry.checkbox.checked ? "true" : "false";
        if (entry.checkbox.checked) {
            state[entry.key] = true;
        } else {
            delete state[entry.key];
        }
        saveState(state);
        updateChapterProgress(meta);
        updateOverallProgress();
    }

    chaptersMeta.forEach((meta) => {
        meta.items.forEach((entry) => {
            entry.checkbox.addEventListener("change", () => handleToggle(meta, entry));
        });
    });
});

function createChecklistItem({ chapterSlug, sectionTitle, item, state }) {
    const key = [chapterSlug, slugify(sectionTitle), slugify(item.label || item.detail || item.text)].join("::");
    const checked = Boolean(state[key]);

    const wrapper = document.createElement("div");
    wrapper.className = "check-item-wrapper";
    wrapper.dataset.checked = checked ? "true" : "false";
    wrapper.dataset.key = key;

    const label = document.createElement("label");
    label.className = "check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.setAttribute("aria-label", item.label || item.text || "Checklist item");

    const content = document.createElement("span");
    content.innerHTML = formatItemContent(item);

    label.append(checkbox, content);
    wrapper.append(label);

    if (Array.isArray(item.derivation) && item.derivation.length) {
        const details = document.createElement("details");
        details.className = "derivation-details";

        const summary = document.createElement("summary");
        summary.textContent = item.derivationSummary || "Show derivation steps";

        const body = document.createElement("div");
        body.className = "derivation-body";
        body.innerHTML = renderDerivationEntries(item.derivation);

        details.append(summary, body);
        wrapper.append(details);

        details.addEventListener("toggle", () => {
            if (details.open && window.MathJax?.typesetPromise) {
                window.MathJax.typesetPromise([details]).catch((error) => {
                    console.warn("MathJax rendering failed", error);
                });
            }
        });
    }

    return { element: wrapper, key, checkbox };
}

function formatItemContent(item) {
    if (item.type === "equation") {
        const detail = Array.isArray(item.detail)
            ? item.detail.map((eq) => toEquationHTML(eq)).join("<br>")
            : toEquationHTML(item.detail);
        return item.label ? `<strong>${escapeHtml(item.label)}:</strong> ${detail}` : detail;
    }

    if (item.label && item.detail) {
        return `<strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.detail)}`;
    }

    if (item.text) {
        return escapeHtml(item.text);
    }

    return "";
}

function renderDerivationEntries(entries) {
    return entries.map((entry) => {
        if (!entry || typeof entry !== "object") {
            return "";
        }

        switch (entry.type) {
            case "heading":
                return `<h4 class="derivation-heading">${renderTextWithMath(entry.text || "")}</h4>`;
            case "equation":
                return `<div class="derivation-equation">${toEquationHTML(entry.tex || entry.text || "", { display: Boolean(entry.display) })}</div>`;
            case "list":
                if (!Array.isArray(entry.items) || !entry.items.length) {
                    return "";
                }
                return `<ul class="derivation-list">${entry.items.map((itemText) => `<li>${renderTextWithMath(itemText)}</li>`).join("")}</ul>`;
            case "text":
            default:
                return `<p class="derivation-text">${renderTextWithMath(entry.text || "")}</p>`;
        }
    }).join("");
}

function toEquationHTML(value, options = {}) {
    const { display = false } = options;
    const delimiter = display ? ["\\[", "\\]"] : ["\\(", "\\)"];
    const tagName = display ? "div" : "span";
    const element = document.createElement(tagName);
    element.className = display ? "equation equation-display" : "equation";
    element.textContent = `${delimiter[0]}${String(value)}${delimiter[1]}`;
    return element.outerHTML;
}

function renderTextWithMath(text) {
    if (!text) {
        return "";
    }

    const delimiters = [
        { start: "\\\\[", end: "\\\\]" },
        { start: "\\\\(", end: "\\\\)" },
        { start: "$$", end: "$$" },
        { start: "$", end: "$" }
    ];

    let cursor = 0;
    let output = "";

    while (cursor < text.length) {
        let match = null;
        for (const delim of delimiters) {
            if (text.startsWith(delim.start, cursor)) {
                match = delim;
                break;
            }
        }

        if (!match) {
            let next = text.length;
            for (const delim of delimiters) {
                const pos = text.indexOf(delim.start, cursor);
                if (pos !== -1 && pos < next) {
                    next = pos;
                }
            }
            output += escapeHtml(text.slice(cursor, next));
            cursor = next;
            continue;
        }

        const startIndex = cursor + match.start.length;
        const endIndex = text.indexOf(match.end, startIndex);
        if (endIndex === -1) {
            output += escapeHtml(text.slice(cursor));
            break;
        }

        const mathSegment = text.slice(cursor, endIndex + match.end.length);
        output += mathSegment;
        cursor = endIndex + match.end.length;
    }

    return output;
}

function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function loadState() {
    try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.warn("Unable to load checklist progress", error);
        return {};
    }
}

function saveState(state) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
        console.warn("Unable to save checklist progress", error);
    }
}

function clearState() {
    try {
        localStorage.removeItem(storageKey);
    } catch (error) {
        console.warn("Unable to clear checklist progress", error);
    }
}

function stateKeys(state) {
    return Object.keys(state || {});
}
