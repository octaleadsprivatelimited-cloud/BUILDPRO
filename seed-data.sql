-- Sample Seed Data for Construction Company Demo
-- Run this in your Supabase SQL Editor after setting up tables

-- Sample Projects
INSERT INTO projects (title, location, type, description, completion_year, image_url) VALUES
('Modern Family Home', 'Los Angeles, CA', 'Residential', 'A beautiful 3-bedroom modern home with open floor plan and premium finishes. Features include a spacious kitchen, master suite, and landscaped backyard.', 2023, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'),
('Luxury Office Complex', 'New York, NY', 'Commercial', '5-story commercial building with modern amenities, energy-efficient systems, and premium office spaces. Includes parking garage and rooftop terrace.', 2022, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'),
('Kitchen Renovation Project', 'Chicago, IL', 'Renovation', 'Complete kitchen remodel with premium finishes, custom cabinetry, and high-end appliances. Transformed a dated space into a modern culinary haven.', 2023, 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'),
('Suburban Residence', 'Austin, TX', 'Residential', 'Custom-built 4-bedroom home with sustainable features and smart home technology. Includes solar panels and energy-efficient HVAC system.', 2023, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'),
('Retail Shopping Center', 'Miami, FL', 'Commercial', 'Modern retail complex with 20+ storefronts, food court, and ample parking. Features contemporary architecture and sustainable design.', 2022, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'),
('Bathroom Remodel', 'Seattle, WA', 'Renovation', 'Luxury bathroom renovation with marble finishes, walk-in shower, and custom vanity. Created a spa-like retreat in the home.', 2023, 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800');

-- Sample Services
INSERT INTO services (title, description, icon) VALUES
('Residential Construction', 'We build custom homes tailored to your vision. From initial design to final walkthrough, we ensure every detail meets your expectations. Our team handles everything from foundation to finishing touches.', '🏠'),
('Commercial Construction', 'Expert commercial construction services for offices, retail spaces, and industrial facilities. Delivered on time and within budget. We understand the unique requirements of commercial projects.', '🏢'),
('Interior & Renovation', 'Transform your existing space with our renovation services. We handle everything from design to execution with precision. Whether it''s a single room or entire home, we bring your vision to life.', '🔨'),
('Turnkey Projects', 'Complete project management from concept to completion. We handle all aspects so you don''t have to. From permits to final inspection, we manage every detail of your construction project.', '📋'),
('Design & Planning', 'Professional architectural design and planning services. Our team creates detailed plans that maximize functionality and aesthetics while staying within budget.', '📐'),
('Maintenance & Repairs', 'Ongoing maintenance and repair services to keep your property in perfect condition. From minor fixes to major repairs, we''re here to help.', '🔧');

