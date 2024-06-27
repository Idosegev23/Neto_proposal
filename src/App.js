import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from "react-spring";
import { Typography, Container, Box, Grid, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { Facebook, Instagram, MessageCircle, Menu as MenuIcon } from "lucide-react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { ParallaxProvider } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/700.css";
import theme from "./theme";
import NewLogo from "../src/NewLogo_BLANK.png"; // עדכון הנתיב לוגו

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
  direction: "rtl",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "white",
  color: "#333",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const Content = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  width: "100%",
  maxWidth: "1200px",
  margin: "2rem auto",
  padding: "2rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    width: "100%",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "300px",
  margin: "0 auto 2rem",
  display: "block",
  [theme.breakpoints.down("sm")]: {
    width: "200px",
  },
}));

const Card = styled(motion.div)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  padding: "3rem",
  marginBottom: "3rem",
  textAlign: "right",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto 3rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
    width: "calc(100% - 2rem)",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SocialLinks = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "2rem",
  [theme.breakpoints.down("sm")]: {
    gap: "0.5rem",
  },
}));

const SocialIcon = styled(motion.a)`
  color: #62238C;
  &:hover {
    color: #BF4B81;
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #62238C, #BF4B81)",
  border: "none",
  color: "white",
  padding: "15px 30px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "1.4rem",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "25px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #BF4B81, #62238C)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
    padding: "10px 20px",
  },
}));

const Footer = styled("footer")(({ theme }) => ({
  textAlign: "center",
  padding: "1rem",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  color: "#333",
  position: "relative",
  zIndex: 2,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  position: "sticky",
  top: 0,
  marginBottom: "2rem",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem 0",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const NavButtons = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledNavButton = styled(Button)`
  color: #62238C;
  font-size: 1.4rem;
  margin: 0 1rem;
  font-weight: 600;
  &:hover {
    background-color: rgba(98, 35, 140, 0.1);
  }
`;

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    color: "#62238C",
    marginTop: "1rem",
  },
}));

const StyledMenuItem = styled(MenuItem)`
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-50px)",
    config: config.molasses,
  });

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.wobbly,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const summary = `
      הצעת מחיר להרצאת בינה מלאכותית ליחידת המחשוב של קבוצת נטו:
      - עלות ההרצאה: 2000 ש"ח (לא כולל מע"מ)
      - נסיעות: 200 ש"ח לכיוון
      - תנאי תשלום: שוטף + 30
    `;
    window.location.href = `mailto:triroars@gmail.com?subject=אישור הצעת המחיר&body=שלום עידו,%0D%0A%0D%0Aאני מאשר את הצעת המחיר.%0D%0A%0D%0Aשמי: ${name}%0D%0Aתפקיד: ${position}%0D%0Aאימייל: ${email}%0D%0A%0D%0Aסיכום ההצעה:%0D%0A${encodeURIComponent(summary
    )}`;
};

const scrollTo = (ref) => {
  ref.current.scrollIntoView({ behavior: "smooth" });
  setMobileMenuAnchor(null);
};

const handleMobileMenuOpen = (event) => {
  setMobileMenuAnchor(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMenuAnchor(null);
};

return (
  <ThemeProvider theme={theme}>
    <ParallaxProvider>
      <StyledContainer maxWidth={false}>
        <Content>
          <StyledAppBar>
            <StyledToolbar>
              <Logo src={NewLogo} alt="TriRoars Logo" />
              <MobileMenuButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </MobileMenuButton>
              <NavButtons>
                <StyledNavButton onClick={() => scrollTo(aboutRef)}>אודות</StyledNavButton>
                <StyledNavButton onClick={() => scrollTo(servicesRef)}>שירותים</StyledNavButton>
                <StyledNavButton onClick={() => scrollTo(pricingRef)}>תמחור</StyledNavButton>
                <StyledNavButton onClick={() => scrollTo(contactRef)}>אישור הצעת מחיר</StyledNavButton>
              </NavButtons>
            </StyledToolbar>
          </StyledAppBar>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <StyledMenuItem onClick={() => scrollTo(aboutRef)}>אודות</StyledMenuItem>
            <StyledMenuItem onClick={() => scrollTo(servicesRef)}>שירותים</StyledMenuItem>
            <StyledMenuItem onClick={() => scrollTo(pricingRef)}>תמחור</StyledMenuItem>
            <StyledMenuItem onClick={() => scrollTo(contactRef)}>אישור הצעת מחיר</StyledMenuItem>
          </Menu>

          <Card ref={servicesRef}>
            <animated.div style={titleAnimation}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom style={{ color: '#62238C', fontFamily: 'Heebo, Arial, sans-serif' }}>
                הצעת מחיר להרצאת בינה מלאכותית ליחידת המחשוב של קבוצת נטו
              </Typography>
            </animated.div>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ color: '#62238C', fontFamily: 'Heebo, Arial, sans-serif' }}>
              תיאור ההרצאה
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontFamily: 'Heebo, Arial, sans-serif' }}>
              ההרצאה שלנו על בינה מלאכותית ליחידת המחשוב של קבוצת נטו נועדה להציג כיצד כלים מתקדמים בבינה מלאכותית יכולים לסייע למתכנתים, מפתחים, אנשי מחשוב, הנהלה ואנשי שרתים לשפר את הפרודוקטיביות והיעילות בארגון. נעסוק בנושאים הבאים:
            </Typography>
            <Box component="ul" style={{ fontSize: isMobile ? '1rem' : '1.2rem', textAlign: 'right', fontFamily: 'Heebo, Arial, sans-serif' }}>
              <li><strong>שימוש ב-ChatGPT ו-Claude</strong></li>
              <ul>
                <li><strong>ChatGPT</strong>: כלי המאפשר אינטראקציות מבוססות שפה טבעית עם משתמשים. נדון בשימושים שונים של ChatGPT, כמו תמיכה טכנית, שירות לקוחות, וניהול תהליכים עסקיים.</li>
                <li><strong>Claude</strong>: כלי מתקדם לעיבוד שפה טבעית וראיה ממוחשבת מבית Anthropic. נסביר כיצד ניתן להשתמש ב-Claude לניתוח נתונים, תמלול טקסטים ותמונות, ותמיכה בפרויקטי פיתוח.</li>
              </ul>
              <li><strong>יצירת GPT's מותאמים</strong></li>
              <ul>
                <li><strong>GPT-3 ו-GPT-4</strong>: נדון כיצד ניתן ליצור מודלים מותאמים אישית לשימושים ספציפיים של הארגון. נסביר כיצד לאמן מודלים אלו ולהשתמש בהם לשיפור תהליכים עסקיים ופיתוח מוצרים חדשניים.</li>
              </ul>
              <li><strong>שימוש בכלי Codex</strong></li>
              <ul>
                <li><strong>Codex</strong>: כלי המאפשר יצירת מודלים מותאמים לצרכים ספציפיים של הארגון, כולל כתיבת קוד, ניתוח טקסטים ותחזיות מבוססות נתונים. נדון כיצד Codex יכול לעזור למפתחים ולמתכנתים לייעל את כתיבת הקוד ולהפוך את העבודה שלהם למהירה ויעילה יותר.</li>
              </ul>
              <li><strong>היכרות עם Devin</strong></li>
              <ul>
                <li>נציג סרטון המציג את Devin, יתרונותיו ומועד השקת הכלי.</li>
              </ul>
            </Box>
          </Card>

          <Card ref={pricingRef}>
            <animated.div style={titleAnimation}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom style={{ color: '#62238C', fontFamily: 'Heebo, Arial, sans-serif' }}>
                תמחור
              </Typography>
            </animated.div>
            <Box component="ul" style={{ fontSize: isMobile ? '1rem' : '1.2rem', textAlign: 'right', fontFamily: 'Heebo, Arial, sans-serif' }}>
              <li><strong>עלות ההרצאה:</strong> 2000 ש"ח (לא כולל מע"מ)</li>
              <li><strong>נסיעות:</strong> 200 ש"ח לכיוון</li>
              <li><strong>תנאי תשלום:</strong> שוטף + 30</li>
            </Box>
          </Card>

          <Card ref={contactRef}>
            <animated.div style={titleAnimation}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom style={{ color: '#62238C', fontFamily: 'Heebo, Arial, sans-serif' }}>
                אישור הצעת מחיר
              </Typography>
            </animated.div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" align="right" gutterBottom style={{ fontFamily: 'Heebo, Arial, sans-serif' }}>
                    שם מלא
                  </Typography>
                  <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    InputProps={{
                      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Heebo, Arial, sans-serif' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" align="right" gutterBottom style={{ fontFamily: 'Heebo, Arial, sans-serif' }}>
                    תפקיד
                  </Typography>
                  <TextField
                    fullWidth
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    InputProps={{
                      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Heebo, Arial, sans-serif' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" align="right" gutterBottom style={{ fontFamily: 'Heebo, Arial, sans-serif' }}>
                    כתובת אימייל
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Heebo, Arial, sans-serif' }
                    }}
                  />
                </Grid>
              </Grid>
              <Box mt={3} display="flex" justifyContent="center">
                <StyledButton
                  type="submit"
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  אשר הצעת מחיר
                </StyledButton>
              </Box>
            </form>
          </Card>

          <SocialLinks>
            <SocialIcon
              href="https://www.facebook.com/profile.php?id=61553596496338"
              target="_blank"
              rel="noopener noreferrer"
              component={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook size={isMobile ? 30 : 40} />
            </SocialIcon>
            <SocialIcon
              href="https://www.instagram.com/triroars/"
              target="_blank"
              rel="noopener noreferrer"
              component={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={isMobile ? 30 : 40} />
            </SocialIcon>
            <SocialIcon
              href="https://wa.me/972547667775"
              target="_blank"
              rel="noopener noreferrer"
              component={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={isMobile ? 30 : 40} />
            </SocialIcon>
          </SocialLinks>
          
          <Box mt={4}>
            <Typography variant="body1" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1rem', fontFamily: 'Heebo, Arial, sans-serif' }}>
              בברכה,<br />
              עידו שגב<br />
              מנכ"ל TriRoars<br />
              אימייל: Triroars@gmail.com<br />
              טלפון: 054-7667775
            </Typography>
          </Box>
        </Content>
        <Footer>
          <Typography variant="body2" style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontFamily: 'Heebo, Arial, sans-serif' }}>
            נבנה באמצעות AI &copy; {new Date().getFullYear()} TriRoars
          </Typography>
        </Footer>
      </StyledContainer>
    </ParallaxProvider>
  </ThemeProvider>
);
};

export default App;
