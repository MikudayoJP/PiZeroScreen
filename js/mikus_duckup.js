setTimeout(function() {
    // Get progress bar elements
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const currentEventProgressBar = document.querySelector('#current-event-progress-bar');
    const nextEventProgressBar = document.querySelector('#next-event-progress-bar');

    // Assuming you have a function to fetch the CSV data
    fetch('/time_table.csv')
    .then(response => response.text())
    .then(data => {
        const events = parseCSVData(data);
        const currentTime = new Date().getTime();
        console.log(events);
        // Calculate remaining time for each event
        events.forEach((event, index) => {
        const eventStartTime = new Date(event.start).getTime();
        const eventDuration = event.duration * 60 * 1000; // convert minutes to milliseconds
        const remainingTime = eventStartTime - currentTime + eventDuration;
        console.log("eventStartTime", eventStartTime);
        console.log("eventDuration", eventDuration);
        console.log("remainingTime", remainingTime);
        // Update progress bar for current event
        if (index === 0) {
            console.log("currentEventProgressBar", currentEventProgressBar.style.width);
            currentEventProgressBar.style.width = `${(remainingTime / eventDuration) * 100}%`;
            console.log("currentEventProgressBar", currentEventProgressBar.style.width);
        }

        // Update progress bar for next event
        if (index === 1) {
            console.log("nextEventProgressBar", nextEventProgressBar.style.width);
            nextEventProgressBar.style.width = `${(remainingTime / eventDuration) * 100}%`;
            console.log("nextEventProgressBar", nextEventProgressBar.style.width);
        }
        });
    });

    // Helper function to parse CSV data
    function parseCSVData(data) {
    const events = [];
    const rows = data.split('\n');
    rows.forEach(row => {
        const columns = row.split(',');
        events.push({
        start: columns[3],
        duration: columns[4],
        });
    });
    return events;
    }
}, 100);
