# Worst UI Event: Research & Idea Reference

**Prepared:** 2 November 2026  
**Purpose:** A reusable reference for a one-hour “design the worst UI” event when the theme is not known yet. This is research and planning material, not a UI implementation.

## How to use this file

Start with a task that people recognize immediately (enter a date, choose a number, adjust a setting, sign in, or submit a short form). Pick one main interaction failure, then add one or two supporting failures. When the event theme arrives, reskin the task and wording while keeping the interaction gag.

The most transferable bad-UI ideas attack the user's mental model: what can I do, what will happen, did it work, and can I recover? A theme changes the surface and the story; those questions remain the same.

## Research scope and limits

I searched public, indexed material across several source types: GitHub repositories and demos; Reddit and Hacker News discussions; UX Stack Exchange and product forums; UX practitioner references; accessibility guidance; and HCI / deceptive-design research. Searches used variations of “bad UI,” “worst UI,” “bad UX,” “anti-pattern,” “confusing interface,” and “dark/deceptive patterns,” including site-scoped searches for GitHub, Reddit, and discussion forums.

This is broad public-web research, not a claim that every internet page was found. Search indexes cannot establish that they found every page; private, deleted, unindexed, or hard-to-search material can be missed. The searches were mostly English-language. Community reactions below are examples and anecdotes, not controlled usability studies. Some links and live demos may change over time.

## Short synthesis

Bad UI patterns are often reversals of long-standing usability heuristics: hide the system's state, use inconsistent behavior, force people to remember rules, make errors hard to prevent or recover from, and remove user control. Nielsen Norman Group's [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) are a useful map of the “good” principles to invert. Its [form-error guidance](https://www.nngroup.com/articles/errors-forms-design-guidelines/) explains how errors placed away from their fields make users search and remember what to fix.

For a comedic challenge, the strongest concepts are specific and legible: a user sees the normal task, recognizes the control, then discovers the control is absurd. A screen that is only crowded or ugly may look careless; one impossible interaction can become a memorable joke. Community responses show that intentionally awkward controls can even be fun, so “worst” does not always mean “least enjoyable.”

---

# Pattern catalog

The “implementation” notes below are concept directions for later, not code or mockups. **Theme fit** describes how easy it is to adapt the pattern to an unknown prompt. **Usefulness** estimates its value under a one-hour build limit.

## A. Input and control failures

### A1. The control's motion or shape does not match the task

- **Type:** Input/control mismatch; broken mapping.
- **Theme fit:** Very high. Works for volume, temperature, quantity, energy, speed, progress, phone numbers, or character stats.
- **Function:** Change a value or enter a number.
- **What the UI does:** Makes the control's mapping surprising or physically awkward.
- **Implementation directions:** Use a control that moves in an unexpected direction, advances in an inconvenient unit, overshoots, drifts, or requires repeated physical effort. A slider can be vertical but move horizontally; a number selector can make each digit behave independently. Keep the intended value visible so the joke is understandable.
- **Why it hurts usability:** Users rely on learned mappings and immediate feedback. A broken mapping makes every action require trial and error.
- **How it helps the presentation:** The mismatch is visible in a single screenshot or short demo and does not require much explanatory text.
- **Examples and reactions:** The [BadUI GitHub gallery](https://github.com/GoulartNogueira/BadUI) lists a Phone Slider Selector and a Fan Controlled Cursor. A separate [bad phone-number hackathon submission](https://github.com/KyleSmith0905/badui-phone-number) uses moving digit columns that users have to align. A Reddit [volume-control contest discussion](https://www.reddit.com/r/badUIbattles/comments/1nv2c45) highlighted a vertical bar controlled by horizontal movement as a funny distraction.
- **Usefulness:** **Very high** if a theme can be mapped to a numeric setting. This is one of the quickest patterns to understand and demonstrate.

### A2. Make a familiar value take many steps

- **Type:** Excessive interaction cost; inefficient input.
- **Theme fit:** High for birthdays, dates, quantities, location, or any value users normally enter quickly.
- **Function:** Choose a date or value.
- **What the UI does:** Converts direct entry into a series of guesses, one-step increments, or repetitive choices.
- **Implementation directions:** Require repeated “earlier/later” guesses for a birthday; make a date picker scroll one month at a time; or ask for a number through many small controls. For a comic version, let the user see how many steps remain.
- **Why it hurts usability:** It adds effort to a common task and can punish mistakes. The interaction is especially irritating if each step loses the user's position.
- **How it helps the presentation:** The time/step counter supplies visible escalation and gives an audience a clear payoff.
- **Examples and reactions:** The [Binary Birthday Reddit post](https://www.reddit.com/r/badUIbattles/comments/pycos8/a_fun_way_to_select-your-birthday/) makes users narrow down their birthday. Some commenters called it fun or easier than date pickers they had used; others noted that an accidental wrong choice could cause trouble. The [BadUI gallery](https://github.com/GoulartNogueira/BadUI) also collects Calendar Hell and Scientific Date Picker concepts. A [Reddit thread about real date pickers](https://www.reddit.com/r/ProgrammerHumor/comments/pln9fd) describes the frustration of clicking back through months to enter an older birth date.
- **Usefulness:** **High.** Strong as a central gag, especially if the theme includes dates or time. Keep the sequence short enough to demo.

### A3. Make text entry obey hidden or hostile rules

- **Type:** Input constraints; hidden requirements.
- **Theme fit:** Very high for signup, account creation, naming a character, writing a message, or entering a code.
- **Function:** Enter text, a name, username, password, or code.
- **What the UI does:** Applies surprising rules, awkward limits, or transformations that are not disclosed in advance.
- **Implementation directions:** Use a comically tiny character limit; reject a familiar format for an obscure reason; move or hide the rule; or make the keyboard layout interfere with ordinary typing. Best when the rule has a clear punchline.
- **Why it hurts usability:** People cannot plan their input if requirements are hidden or change unexpectedly. They may lose effort repeatedly correcting the same field.
- **How it helps the presentation:** Forms are familiar and easy to adapt to almost any setting or theme.
- **Examples and reactions:** The [BadUI GitHub gallery](https://github.com/GoulartNogueira/BadUI) lists Bad Name Selector, Limit Username Size, and Tabbed Keyboard examples. Nielsen Norman Group explains a real version of this problem in [Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/): placeholder-only instructions disappear as users type and are unavailable when they need to review their answers.
- **Usefulness:** **Very high.** A form is one of the easiest scaffolds to theme later. Make the hostile rule visible in the demo rather than relying on hidden implementation.

### A4. Use an interaction that depends on an unrelated ability

- **Type:** Unnecessary physical or device-dependent input.
- **Theme fit:** Medium to high; useful if a theme suggests motion, sensors, physical effort, or magical gestures.
- **Function:** Sign in, move a cursor, choose an option, or submit a form.
- **What the UI does:** Requires tilting, dragging, precision movement, or another ability unrelated to the task.
- **Implementation directions:** Make login depend on a gyroscope, or make a cursor follow an unpredictable force. Keep an ordinary alternative visibly unavailable or comically inferior if needed for the joke.
- **Why it hurts usability:** It makes the task depend on hardware, environment, dexterity, or physical context that the task itself does not need.
- **How it helps the presentation:** A short live interaction can be entertaining and immediately demonstrates the problem.
- **Examples and reactions:** A [mobile gyroscope-login post](https://www.reddit.com/r/badUIbattles/comments/q277um/mobile_gyroscopebased_login_form/) and the [fan-controlled cursor example](https://www.reddit.com/r/badUIbattles/comments/ug4cbj/a_cursor_controlled_by_a_fan/) are deliberately absurd interaction concepts.
- **Usefulness:** **Medium.** Visually memorable, but dependent on device support and tricky to fit into a one-hour build. Avoid making the demo impossible to run.

## B. Navigation and affordance failures

### B1. Make actions hard to identify

- **Type:** Ambiguous labels; “mystery meat” navigation.
- **Theme fit:** Very high.
- **Function:** Navigate, continue, choose, confirm, or cancel.
- **What the UI does:** Uses icon-only controls, vague copy, misleading labels, or links that do not look like links.
- **Implementation directions:** Put an unclear icon beside the primary action; label the real next step “HERE”; or make button labels contradict their effect. Keep a visible clue so an audience can follow the joke.
- **Why it hurts usability:** Users must guess rather than recognize available actions. This also harms screen-reader and low-vision users when controls lack accessible names.
- **How it helps the presentation:** It is fast to create and works in forms, dashboards, games, and settings.
- **Examples and reactions:** [User Inyerface](https://userinyerface.com/) opens with a “NO” button and a “HERE” link to proceed. The [UX Stack Exchange Hall of Shame discussion](https://ux.stackexchange.com/questions/145865/is-there-an-interface-hall-of-shame-and-fame-for-web-design) points to historical examples and notes that poor usability and intentionally deceptive design are related but distinct categories.
- **Usefulness:** **High.** Cheap and theme-independent. Use one or two ambiguous actions; too many can make the whole screen unreadable rather than funny.

### B2. Change conventions from one step to the next

- **Type:** Inconsistency; mode error.
- **Theme fit:** Very high.
- **Function:** Any repeated action across multiple screens.
- **What the UI does:** Moves a control, reverses button order, changes an icon's meaning, or uses different terminology for the same action.
- **Implementation directions:** Keep a repeated action in a different place on each step; make “back” behave differently from step to step; or switch the meaning/order of two choices at a reveal. The user should have an understandable expectation to violate.
- **Why it hurts usability:** People learn patterns and use muscle memory. Inconsistency forces them to re-check every screen and makes accidental choices more likely.
- **How it helps the presentation:** A reveal after the user has learned the pattern can make the gag land.
- **Examples and reactions:** Commenters on the [Binary Birthday thread](https://www.reddit.com/r/badUIbattles/comments/pycos8/a_fun_way_to_select_your_birthday/) suggested swapping button order or allowing a mistake to restart. These are suggestions, not features of every version of the demo.
- **Usefulness:** **High**, especially as a secondary twist. Avoid random changes with no setup; the audience needs to notice the broken convention.

### B3. Add layers and detours to a simple task

- **Type:** Navigation depth; obstruction.
- **Theme fit:** High for dashboards, game menus, account settings, booking, or administrative workflows.
- **Function:** Find a setting or finish a short task.
- **What the UI does:** Adds unnecessary steps, nested menus, repeated prompts, or a maze-like route.
- **Implementation directions:** Put the common action several screens deep; insert a confirmation that does not clarify the consequence; or require the user to go through unrelated choices before reaching the task.
- **Why it hurts usability:** It increases the number of decisions and makes it harder to maintain a sense of location and progress.
- **How it helps the presentation:** It can show a clear escalation from a normal request to an absurd journey.
- **Examples and reactions:** In an [Hacker News discussion of frustrating interfaces](https://news.ycombinator.com/item?id=45252167), commenters complained about disorganized products, delayed navigation, and basic actions taking too much effort. In an [Adobe Community discussion](https://community.adobe.com/questions-404/the-general-ui-is-terrible-1553180), a user listed duplicate icons, inconsistent workspaces, no visible return path, and hard-to-find deletion.
- **Usefulness:** **Medium.** Easy to describe but can take longer to implement than one broken control. Keep it to a short, demonstrable path.

## C. Feedback, errors, and recovery

### C1. Make it unclear whether an action worked

- **Type:** Missing or misleading system feedback.
- **Theme fit:** Very high.
- **Function:** Submit, save, add, purchase, change a setting, or load content.
- **What the UI does:** Gives no response, gives a delayed response, shows an ambiguous state, or claims success while not making the result clear.
- **Implementation directions:** Leave a button visually unchanged after click; show an unhelpful spinner; or make the confirmation appear somewhere unexpected. For a presentation, ensure the user can still see what the system did.
- **Why it hurts usability:** Users cannot decide what to do next and may repeat the action or abandon it.
- **How it helps the presentation:** A very small implementation detail can trigger a familiar frustration.
- **Research basis:** Nielsen Norman Group's [Visibility of System Status heuristic](https://www.nngroup.com/articles/visibility-system-status/) says feedback helps people understand whether an action succeeded and what they should do next.
- **Usefulness:** **High** as a supporting failure. By itself it may be too subtle for a quick judging demo.

### C2. Report errors late, vaguely, or far away

- **Type:** Validation failure; poor error recovery.
- **Theme fit:** Very high for forms, checkout, registration, booking, and configuration.
- **Function:** Validate user-entered data.
- **What the UI does:** Waits until submission to reveal a requirement, uses an opaque error, or separates the error from the field that needs correction.
- **Implementation directions:** Reject a value after the whole form is submitted; show a generic error at the top; make the message name an internal rule rather than what the user should do; or show an error before the user has finished typing.
- **Why it hurts usability:** Users have to search for the problem, remember the message, and guess at the correction. Early validation can also interrupt people before they finish entering a value.
- **How it helps the presentation:** It can compound a hostile-input joke without requiring elaborate visual work.
- **Examples and reactions:** Nielsen Norman Group's [form-error guidelines](https://www.nngroup.com/articles/errors-forms-design-guidelines/) explain the benefit of nearby, actionable errors. Its [Hostile Patterns in Error Messages](https://www.nngroup.com/articles/hostile-error-messages/) warns that error messages can be excessively impulsive or visually overwhelming.
- **Usefulness:** **Very high** as a supporting pattern in any form-based concept.

### C3. Punish mistakes by removing progress or blocking exit

- **Type:** Loss of state; no undo; user-control failure.
- **Theme fit:** High for onboarding, games, setup, forms, or multi-step tasks.
- **Function:** Recover from a mistake, go back, cancel, or change an answer.
- **What the UI does:** Erases completed answers, restarts the flow, hides a back button, or makes “cancel” behave like “continue.”
- **Implementation directions:** After a harmless error, reset one or more earlier fields; make back lose the current state; or make a mistake produce an absurd but clear consequence. For a live presentation, give the audience a reliable way to reset the demo.
- **Why it hurts usability:** Users lose effort and feel trapped. It undermines user control and makes experimentation risky.
- **How it helps the presentation:** The consequence makes earlier friction feel connected and raises the stakes.
- **Examples and reactions:** In the [Binary Birthday discussion](https://www.reddit.com/r/badUIbattles/comments/pycos8/a_fun_way_to_select_your_birthday/), commenters proposed restart-on-error and an “I messed up” path. The [UX Stack Exchange discussion](https://ux.stackexchange.com/questions/145865/is-there-an-interface-hall-of-shame-and-fame-for-web-design) also distinguishes ordinary poor UX from deceptive behavior that deliberately obstructs a user's goal.
- **Usefulness:** **High**, but use sparingly; a complete dead-end can prevent judges from seeing the rest of the design.

## D. Visual hierarchy and accessibility failures

### D1. Make everything compete for attention

- **Type:** Visual clutter; hierarchy failure; layout collision.
- **Theme fit:** High, although some visual styles may be part of a theme.
- **Function:** Scan a page and identify the main task or action.
- **What the UI does:** Uses too many competing elements, overlaps content, mixes alignment and spacing, or gives every element equal emphasis.
- **Implementation directions:** Place a decorative label over content, make secondary elements louder than the primary action, or pack unrelated controls together. Preserve enough contrast and recognizable content for the audience to understand the concept.
- **Why it hurts usability:** People cannot quickly tell what matters or where to look. Overlap can also cause mis-clicks.
- **How it helps the presentation:** A deliberately overloaded screen communicates chaos quickly.
- **Examples and research:** IxDF's [bad UI examples](https://assets.interaction-design.org/literature/article/bad-ui-design-examples) describes overlapping content/action controls and an overloaded search-result overlay as problems that disrupt reading and can cause confusion or mis-clicks.
- **Usefulness:** **Medium.** Fast to style but easy to confuse with intentional maximalist art. Anchor the chaos around one obvious task.

### D2. Make text and controls hard to perceive or operate

- **Type:** Low contrast; tiny targets; missing labels; accessibility barrier.
- **Theme fit:** High, but these failures can make the demo impossible to use.
- **Function:** Read instructions and operate controls.
- **What the UI does:** Reduces legibility or makes targets difficult to hit.
- **Implementation directions:** Use subdued text, crowded controls, or labels detached from their fields. Keep a readable demo version or enough visual explanation for judges.
- **Why it hurts usability:** Users may be unable to perceive content, distinguish controls, or operate the page through their preferred input method.
- **Sources:** The [W3C WCAG contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) defines minimum text contrast expectations. A recent study of deceptive design experiences among people using visual accessibility technology found that unlabeled elements and keyboard-navigation barriers can amplify obstruction and other deceptive patterns: [Inaccessible and Deceptive](https://pmc.ncbi.nlm.nih.gov/articles/PMC12188898/).
- **Usefulness:** **Low to medium.** It is easy to make, but low readability often hides the joke instead of making it stronger. Use this as a small accent, not the whole concept.

## E. Deceptive and coercive patterns

### E1. Nudge the user toward a choice they did not intend

- **Type:** Dark/deceptive pattern; coercive choice architecture.
- **Theme fit:** High for checkout, subscriptions, permissions, or account setup.
- **Function:** Choose an option, accept terms, share data, subscribe, or cancel.
- **What the UI does:** Makes one choice prominent and another hard to find, uses confusing wording, adds nagging prompts, or obstructs a desired action.
- **Implementation directions:** Make the choice buttons visually unequal; phrase the opt-out in a confusing way; or make one choice require extra steps. In a comic event, make the manipulation obvious enough that it reads as satire.
- **Why it hurts usability:** It steers people away from their goals and reduces meaningful control.
- **How it helps the presentation:** It can support a theme about bureaucracy, greed, villainy, or absurd corporate systems.
- **Research and examples:** Mathur et al.'s [Dark Patterns at Scale](https://doi.org/10.1145/3359183) studied roughly 53,000 product pages from 11,000 shopping sites and identified recurring patterns across categories. The [Deceptive Design taxonomy](https://deceptive.design/) and the research overview [Dark Patterns: Past, Present, and Future](https://deceptive.design/articles/dark-patterns-past-present-and-future/) describe obstruction, nagging, hidden information, and manipulative defaults.
- **Usefulness:** **Medium.** Strong for a specific narrative/theme; less universal as a visual joke. Treat it as satire rather than a realistic attempt to trick a real user.

---

# Theme transfer guide

These are not additional designs; they are reminders for reskinning the same interaction mechanics after the event theme is announced.

| If the theme is… | Familiar task to borrow | Theme-neutral failure to apply |
|---|---|---|
| Fantasy / magic | Cast a spell, choose an item, set a quest date | Make spell selection use an unrelated or inconsistent control |
| Food / restaurant | Customize an order or reserve a table | Hide required options until submit; use a bizarre quantity picker |
| Horror | Unlock a door, enter a code, choose a route | Give misleading feedback or make the reset button ominous |
| Space / sci-fi | Set coordinates, launch time, ship power | Use an unintuitive slider or force many date/number steps |
| Animals / pets | Enter a name, age, or care preference | Impose hidden naming rules or a hostile age selector |
| Office / bureaucracy | Submit a form or request approval | Add nested steps, confusing labels, and repeated confirmations |
| Game / arcade | Choose difficulty, adjust sound, equip an item | Break expected control mapping, order, or state feedback |

A theme should explain the joke, not bury it. Reuse familiar task language so the audience quickly understands what should happen.

# What seems most useful for a one-hour build

| Candidate | Build effort | Theme flexibility | Demo clarity | My assessment |
|---|---:|---:|---:|---|
| Cursed date/number picker | Low–medium | High | High | Best central interaction if the theme includes dates, time, age, quantity, or stats. |
| Hostile signup/profile form | Low | Very high | High | Best all-purpose scaffold; easy to reskin, and errors/labels/constraints can compound naturally. |
| Mismatched setting control | Low–medium | Very high | Very high | Best if the theme suggests a slider value such as sound, power, temperature, speed, or progress. |
| Confusing navigation maze | Medium | High | Medium | Useful for dashboard or bureaucracy themes; limit the number of screens. |
| Dark-pattern checkout/cancel flow | Medium | Medium | High | Good story potential, but it reads as manipulation more than visual comedy unless exaggerated. |
| Low contrast / clutter alone | Low | High | Low | Fast but weakest as a standalone premise; audience may only see an ugly page. |

**My recommendation for later:** keep three candidate mechanics ready—(1) a hostile form, (2) a cursed picker, and (3) a mismatched setting control. When the theme arrives, choose the one whose task maps most naturally to it. One main gag plus two supporting failures should be easier to understand, build, and judge than a screen full of unrelated anti-patterns.

# Reference library by source type

## Interactive demonstrations

- [User Inyerface — worst-practice UI experiment](https://userinyerface.com/) — live form-based demo. Useful for hostile labels, misleading progression, and frustrating form behaviors.
- [BadUI live gallery](https://goulartnogueira.github.io/BadUI/) — interactive demos linked from the GitHub project below.
- [Phone Slider Selector](https://goulartnogueira.github.io/BadUI/Phone-Slider-Selector/BadUIPhone.html) — example of an awkward phone-number input.
- [Calendar Hell](https://goulartnogueira.github.io/BadUI/calendar-hell/) — date selection experiment.
- [Scientific Date Picker](https://goulartnogueira.github.io/BadUI/ScientificDatePicker/) — another intentionally unusual date-entry demo.

## GitHub repositories and indexes

- [GoulartNogueira/BadUI](https://github.com/GoulartNogueira/BadUI) — a collection inspired by r/badUIbattles. Its README lists Phone Slider Selector, Bad UI Birthday, Calendar Hell, Bad Name Selector, Limit Username Size, Scientific Date Picker, High Low Birthday, Fan Controlled Cursor, Tabbed Keyboard, and Catch Login.
- [kurone-kito/awesome-bad-ui-ux](https://github.com/kurone-kito/awesome-bad-ui-ux) — a curated directory linking to examples and articles, plus Japanese case studies. Use it as a discovery list, not as a definitive ranking.
- [KyleSmith0905/badui-phone-number](https://github.com/KyleSmith0905/badui-phone-number) — a submission to a worst phone-number-selector challenge. The README describes a moving digit-column interaction.

## Usability research and practitioner references

- [Nielsen Norman Group — 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — framework for visibility, consistency, error prevention, recognition, control, and recovery.
- [NN/g — Visibility of System Status](https://www.nngroup.com/articles/visibility-system-status/) — why timely feedback matters.
- [NN/g — 10 Design Guidelines for Reporting Errors in Forms](https://www.nngroup.com/articles/errors-forms-design-guidelines/) — why inline, actionable, nearby errors reduce effort.
- [NN/g — Hostile Patterns in Error Messages](https://www.nngroup.com/articles/hostile-error-messages/) — examples of excessive or poorly timed error feedback.
- [NN/g — Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/) — how placeholder-only labels/instructions create memory and correction problems.
- [Interaction Design Foundation — 7 Bad UI Design Examples](https://assets.interaction-design.org/literature/article/bad-ui-design-examples) — examples including overlap and overloaded search presentation.
- [W3C WAI — WCAG 2.2 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) — authoritative contrast guidance.

## HCI / deceptive-design research

- [Mathur et al. — Dark Patterns at Scale](https://doi.org/10.1145/3359183) — large-scale study of deceptive patterns on shopping sites.
- [Narayanan et al. — Dark Patterns: Past, Present, and Future](https://deceptive.design/articles/dark-patterns-past-present-and-future/) — overview of research and categories such as obstruction, nagging, and manipulative defaults.
- [Shadows in the Interface: A Comprehensive Study on Dark Patterns](https://doi.org/10.1145/3643736) — later taxonomy review and research discussion.
- [Inaccessible and Deceptive](https://pmc.ncbi.nlm.nih.gov/articles/PMC12188898/) — research on how visual-accessibility barriers can amplify deceptive design problems.

## Forums, threads, and community discussions

- [r/badUIbattles — Binary Birthday](https://www.reddit.com/r/badUIbattles/comments/pycos8/a_fun_way_to_select_your_birthday/) — reactions include enjoyment, accidental-choice concerns, and ways to make the picker worse.
- [r/badUIbattles — Gyroscope-based login](https://www.reddit.com/r/badUIbattles/comments/q277um/mobile_gyroscopebased_login_form/) — physical-device dependency as a joke mechanic.
- [r/badUIbattles — Volume-control contest discussion](https://www.reddit.com/r/badUIbattles/comments/1nv2c45) — examples of mismatched control mappings and community reactions.
- [Hacker News — frustrating interfaces people use regularly](https://news.ycombinator.com/item?id=45252167) — anecdotal complaints about navigation, disorganization, and basic workflows.
- [Adobe Community — “The general UI is terrible”](https://community.adobe.com/questions-404/the-general-ui-is-terrible-1553180) — specific complaints about duplicate icons, missing return paths, inconsistent layouts, and hard-to-find actions.
- [UX Stack Exchange — Interface Hall of Shame/Fame](https://ux.stackexchange.com/questions/145865/is-there-an-interface-hall-of-shame-and-fame-for-web-design) — pointers to older design-failure archives and the distinction between accidental poor UX and deceptive patterns.
- [r/ProgrammerHumor — calendar/date-picker complaints](https://www.reddit.com/r/ProgrammerHumor/comments/pln9fd) — user anecdotes about having to traverse many months to enter a birth date.

## Source reading notes

- **Evidence strength varies.** HCI studies and standards support broad usability claims; repository demos show what people have built; forum comments show individual reactions.
- **Bad UI versus dark patterns:** A confusing or awkward interface can be accidental. Dark patterns are designed to steer, coerce, or deceive. The distinction matters when choosing tone.
- **Current examples can change.** Live services and community threads may be edited or unavailable later. The pattern catalog above is intended to preserve the reusable idea even if a linked demo changes.

# Ready-to-use event-day plan

This section captures the decisions that can be made quickly once the theme and event constraints are known. It keeps the work focused on a demonstrable result within a 60-minute window.

## What to send when the theme arrives

**Most helpful:**

1. The exact theme prompt and any extra wording from the organizers.
2. What must be submitted: a live working prototype, a hosted link, screenshots, a design file, or a verbal presentation.
3. Any judging rubric or rules, especially if they reward humor, visual polish, interactivity, theme fit, or code.

**Helpful if you already know it:**

- Required device or screen size; whether judges will click/tap or only view a screenshot.
- Allowed framework, libraries, AI tools, images, external assets, and internet access.
- Whether the starter project must be used and whether the result needs to run offline.

If some details are missing, the best fallback is to inspect the project and the event instructions, then build the smallest working deliverable that demonstrates the joke. The brief does not need to be fully specified before starting.

## Fast concept filter

Score each candidate from 1–5 on these checks, then choose the one with the best total and lowest implementation risk:

| Check | A strong candidate… |
|---|---|
| Theme connection | Can be explained in one sentence using the theme's own nouns or actions. |
| Familiar task | Starts from an interaction judges already understand, such as selecting, entering, adjusting, or confirming. |
| Punchline visibility | Makes the bad behavior obvious within the first few clicks or one screenshot. |
| Interaction payoff | Lets a judge personally experience the friction or see the consequence. |
| One-hour feasibility | Can be implemented without complicated assets, APIs, or device permissions. |
| Recovery for demo | Has a reliable restart path so a mistake or dead end does not ruin the presentation. |

Avoid a concept whose core joke depends on hidden details the judge may not discover. Prefer one clear interaction with a visible cause and effect.

## Suggested 60-minute pacing

This is a flexible budget, not a rule; shorten the visual polish stage if the core interaction needs more time.

| Time | Focus | Exit condition |
|---|---|---|
| 0–5 min | Read theme/rules; identify what will be judged and how it will be shown. | Constraints and deliverable are understood. |
| 5–10 min | Choose one familiar task and one central anti-pattern; select one backup idea. | The premise fits in one sentence and a judge can understand the task. |
| 10–16 min | Sketch the screen and interaction states. Decide the first click, failure/reveal, and reset. | No extra screens or features without a clear purpose. |
| 16–40 min | Build the core interaction and the main joke. | The demo works from start to finish, even if it is visually plain. |
| 40–50 min | Apply the theme's visual language and add at most two supporting bad patterns. | The theme reads clearly and supports the joke. |
| 50–56 min | Run through the judge path on the target device; fix blocking errors and reset issues. | It can be demonstrated reliably in under a minute. |
| 56–60 min | Capture the required submission and prepare a one-sentence explanation. | Deliverable is ready and the punchline is easy to present. |

## One-sentence premise template

> “This is a [theme-flavored task] where [familiar control/task] is made frustrating by [one central bad-UI rule], then [visible consequence or punchline].”

If the sentence is hard to complete, the concept may need a clearer task or a simpler interaction.

## Demo checklist

- The first screen makes the intended task apparent.
- The central bad interaction is discoverable without a long explanation.
- The theme shows up in both copy and visual styling, but does not obscure controls.
- A judge can reach the punchline quickly.
- There is a way to reset or restart between viewers.
- The design remains understandable at the actual display size.
- Any deliberately misleading or inaccessible detail is limited to the joke and does not block the whole demo.
- The submission format matches the event rules.

## Practical build defaults if the event is underspecified

- Prefer one screen or a very short flow.
- Use the project's existing stack and assets if a starter project is provided.
- Make the core interaction work before adding visual effects.
- Keep the demo self-contained; avoid relying on external services, permissions, or network calls unless the theme requires them.
- Use a built-in reset path and preserve enough state for judges to understand what just happened.
- Save time for one complete run-through rather than adding a final untested feature.
