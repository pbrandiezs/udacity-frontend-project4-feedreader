/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*
 * Updated by: Perry Brandiezs
 * Date: 8/25/19
*/

/*jshint esversion: 6 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            // test allFeeds are defined.
            expect(allFeeds).toBeDefined();
            // test that the feeds exist.
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("each feed url is defined and url is not empty", function(){
            for (var feed of allFeeds) {
                // Test that feed url is defined.
                expect(feed.url).toBeDefined();
                // Test the feed url length is not 0.
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("each feed name is defined and name is not empty", function(){
            // Test each feed
            for (var feed of allFeeds) {
                // Test for the feed name to be defined.
                expect(feed.name).toBeDefined();
                // Test for the feed name length to not be 0.
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Write a new test suite named "The menu" */
    describe("The menu", function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("menu is hidden by default", function(){
            // Test for the menu to be hidden by default.
            expect(document.getElementsByTagName("BODY")[0].className)
                .toBe("menu-hidden");
        });
         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("menu displays when clicked, and hides when clicked again",
            function(){
            // Click the menu to show (not hidden)
            document.getElementsByClassName("menu-icon-link")[0].click();
            expect(document.getElementsByTagName("BODY")[0]
                .className).not.toBe("menu-hidden");
            // Click the menu again to be hidden
                document.getElementsByClassName("menu-icon-link")[0].click();
            expect(document.getElementsByTagName("BODY")[0]
                .className).toBe("menu-hidden");
        });
    });
    /* Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // load the initial feed.
        beforeEach(function(done) {
            loadFeed(0);
            done();
        });

        it("loadFeed has at least a single .entry element", function(done) {
            // test to confirm at least a single entry does exist.
            expect(document.getElementsByClassName("entry").length).not.toBe(0);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var oldContent,
            newContent;

        // Load initial feed, capture oldContent.
        beforeEach(function(done) {
            // Load initial feed.
            loadFeed(0, function(){
                // Capture old content to be used in comparison.
                oldContent = document.getElementsByClassName("entry");
                oldContent = oldContent[0].innerText;
                // Load new content.
                loadFeed(1, function(){
                    done();
                });
            });
        });

        it("new feed content actually changes", function(done) {
            // Capture new content for comparison.
            newContent = document.getElementsByClassName("entry");
            newContent = newContent[0].innerText;
            // Test to confirm content has changed.
            expect(oldContent).not.toEqual(newContent);
            done();
        });
    });
}());
