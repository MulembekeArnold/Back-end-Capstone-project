// middleware/auth.js - Basic JWT check for role-based access
const jwt = require('jsonwebtoken');

const verifyStudent = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("Access Denied");
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.role !== 'Student') return res.status(403).send("Students only");
        req.user = verified;
        next();
    } catch (err) { res.status(400).send("Invalid Token"); }
};

// routes/projects.js - Submission logic
router.post('/submit', verifyStudent, async (req, res) => {
    const { title, description, category, github_link } = req.body;
    // Logic to save project with status 'Pending'
});