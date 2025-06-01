import type React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  useTheme,
  alpha,
  Grid2,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "../UI/Link";

const MotionBox = motion(Box, { forwardMotionProps: true });

const Footer: React.FC = () => {
  const theme = useTheme();

  const footerLinks = {
    services: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "UI/UX Design", href: "#" },
      { name: "Consulting", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Status", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: LinkedIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: YouTube, href: "https://youtube.com", label: "YouTube" },
  ];

  const contactInfo = [
    { icon: Email, text: "hello@englash.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: LocationOn, text: "San Francisco, CA" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: "white",
        py: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid2 container spacing={4}>
          {/* Brand Section */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TOEIC BOOSTER
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                TOEIC learning made simple and effective.
              </Typography>

              {/* Contact Info */}
              <Stack spacing={1}>
                {contactInfo.map((item, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <item.icon sx={{ fontSize: 18, opacity: 0.8 }} />
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.9, color: "white" }}
                    >
                      {item.text}
                    </Typography>
                  </MotionBox>
                ))}
              </Stack>
            </MotionBox>
          </Grid2>

          {/* Links Sections */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 4 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    Services
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.services.map((link, index) => (
                      <Link
                        to={link.href}
                        key={index}
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "white",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </MotionBox>
              </Grid2>

              <Grid2 size={{ xs: 4 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    Company
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.company.map((link, index) => (
                      <Link
                        to={link.href}
                        key={index}
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "white",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </MotionBox>
              </Grid2>

              <Grid2 size={{ xs: 4 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    Support
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.support.map((link, index) => (
                      <Link
                        to={link.href}
                        key={index}
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "white",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </MotionBox>
              </Grid2>
            </Grid2>
          </Grid2>

          {/* Social Media Section */}
          <Grid2 size={{ xs: 12, md: 2 }}>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                Follow Us
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "white",
                        backgroundColor: alpha(theme.palette.common.white, 0.2),
                        borderColor: alpha(theme.palette.common.white, 0.3),
                      },
                    }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </Stack>
            </MotionBox>
          </Grid2>
        </Grid2>

        {/* Bottom Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          sx={{ mt: 2 }}
        >
          <Divider
            sx={{
              borderColor: alpha(theme.palette.common.white, 0.2),
              mb: 3,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "center" },
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                textAlign: { xs: "center", md: "left" },
                color: "white",
              }}
            >
              © 2025 TOEIC BOOSTER. All rights reserved.
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
                (item, index) => (
                  <Link
                    key={index}
                    to="#"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    {item}
                  </Link>
                ),
              )}
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Footer;
