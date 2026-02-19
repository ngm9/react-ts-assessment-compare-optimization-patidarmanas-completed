# React + TypeScript Optimization Task: Utkrusht Assessment Bundle Comparison

## Task Overview

Utkrusht is a proof-of-skills marketplace that offers assessment bundles to help teams evaluate candidates quickly. This internal React + TypeScript dashboard allows team members to browse over 1,000 assessment bundles and add them to a compare view to analyze pricing, skill coverage, and available capacity. The application is fully functional and type-safe, but it suffers from significant performance issues under realistic load: redundant API requests, cascading re-renders across large component trees, and repeated expensive computations all combine to make the UI feel slow and unresponsive. You are not fixing broken features; instead, you are optimizing a working application so it remains responsive and scalable as data volume and usage grow.

In its current form, the application fetches the same bundle data from multiple places, computes analytics repeatedly for many components, and uses a global selection context that causes every consumer to re-render on almost any interaction. The compare view renders a large table of selected bundles, and the bundles list renders a long list of cards, both of which can stutter as you interact with filters or selection toggles. Your task is to analyze these behaviors and make focused, high-impact improvements that reduce unnecessary work while preserving business logic. This is intended as a 30–45 minute optimization exercise that requires you to reason about architecture, state placement, and data flow rather than exhaustively rewriting the app.

## Objectives

- Analyze and identify performance bottlenecks across multiple application areas using profiling tools and code inspection.
- Reduce unnecessary component re-renders throughout the assessment bundle list and compare views.
- Optimize state management patterns, especially the selection context, to prevent cascading updates across unrelated components.
- Refactor API call patterns to eliminate redundant loading of the same assessment bundles and move toward more efficient reuse.
- Implement strategic memoization across components, hooks, and utility functions where it provides meaningful benefit.
- Optimize context providers so that changes in selection state do not force full re-renders of every consumer.
- Improve UI responsiveness under realistic load conditions with hundreds or thousands of bundles.
- Maintain TypeScript type safety and strict compiler settings while performing architectural refactors.
- Apply advanced React performance best practices to critical rendering paths in the list and compare UIs.
- Make informed trade-off decisions between different optimization approaches instead of applying every possible technique.
- Measure and verify performance improvements with concrete observations or metrics rather than relying solely on intuition.
- Ensure that any optimizations preserve or improve code readability and maintainability.

## How to Verify

- Use the React DevTools Profiler to measure render frequency and duration for key components such as the bundles list, individual bundle cards, the selection context consumers, and the compare table before and after your changes.
- Monitor the browser Network tab to confirm that the number of API calls to load assessment bundles is reduced and that no redundant requests remain when navigating between pages or interacting with the UI.
- Measure initial load time and time-to-interactive qualitatively by reloading the app with a large data set and observing when the main views become usable.
- Interact with the list and compare views by selecting and deselecting bundles, switching between routes, and observing whether UI responsiveness improves.
- Confirm that TypeScript compilation remains error-free with strict mode enabled and that you do not introduce any new type regressions.
- Verify that all existing functionality still works correctly: bundles load, selections toggle, totals update, and navigation between views remains intact.
- Check the browser console for any new warnings or errors introduced as part of your optimizations and address them if present.
- Compare render counts for key components before and after refactoring to ensure that memoization and state changes are having the desired effect.
- Try higher-load scenarios by simulating more interactions or imagining future growth in the number of bundles and ensure the app still feels responsive.
- Confirm that expensive analytics computations are not needlessly repeated across multiple components and renders.
- Review the overall architecture after your changes to ensure that the optimizations do not introduce unnecessary complexity.

## Helpful Tips

- Consider how React's rendering cycle and reconciliation algorithm impact performance when a context provider or high-level component changes frequently.
- Consider where state is placed today and how often changes to that state force re-renders of large parts of the component tree.
- Consider whether the same data is being fetched multiple times from different components and how you might consolidate or share those results.
- Think about which parts of the UI actually depend on specific pieces of state and whether some state can be colocated nearer to where it is used.
- Think about how TypeScript's strong typing can help you refactor hooks, context values, and utility functions safely while you optimize.
- Think about which computations are inherently expensive (for example, aggregations over many bundles) and how often they are repeated.
- Explore React's memoization capabilities and how they can reduce redundant computation or prevent child components from re-rendering unnecessarily.
- Explore opportunities to move derived data calculation out of hot rendering paths and into memoized selectors or helper functions.
- Explore how the selection context is structured and whether splitting responsibilities or narrowing the value surface could improve performance.
- Review the component tree in React DevTools to see which components re-render on selection changes or data reloads.
- Review the data flow between pages, list components, cards, and the compare table to identify unnecessary prop passing and recalculation.
- Analyze the relationship between the number of bundles rendered and the perceived performance of scrolling and interaction.
- Analyze trade-offs between introducing new abstractions (custom hooks, selectors) and keeping the codebase approachable for future maintainers.
- Analyze how you might gradually introduce caching or memoization in a way that is easy to test and reason about.
- Analyze which optimizations will have the highest impact given the time constraints and focus on those first.
