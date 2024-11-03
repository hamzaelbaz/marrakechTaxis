const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let fetch;
import('node-fetch').then(({ default: _fetch }) => {
    fetch = _fetch;
});

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/form', async (req, res) => {
    const { name, start, destinations, numbers, emails, messages } = req.body;

    try {
        if (!fetch) {
            // Import fetch if it's not already available
            await import('node-fetch').then(({ default: _fetch }) => {
                fetch = _fetch;
            });
        }

        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            body: JSON.stringify({ name, start, destinations, numbers, emails, messages }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
});