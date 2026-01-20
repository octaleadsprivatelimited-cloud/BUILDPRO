-- Demo Articles for News Site
-- Run this in Supabase SQL Editor after running news-site-database-setup.sql

-- Helper function to generate slug (if not already created)
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
END;
$$ LANGUAGE plpgsql;

-- Insert Demo Articles
INSERT INTO articles (title, slug, excerpt, content, author, category, section, featured_image_url, published, featured, published_at) VALUES

-- Featured U.S. Articles
('Major Policy Shift Announced by Administration', generate_slug('Major Policy Shift Announced by Administration'),
 'The administration unveiled a comprehensive new policy framework that will affect millions of Americans across multiple sectors.',
 'In a landmark announcement today, the administration revealed a sweeping new policy framework that represents one of the most significant shifts in recent years. The policy, which has been in development for months, addresses critical issues facing the nation.

The new framework includes provisions for economic reform, healthcare access, and environmental protection. Officials described it as a "comprehensive approach to addressing the challenges of the 21st century."

"This policy represents our commitment to building a better future for all Americans," said a senior administration official during the announcement. "We have carefully considered the needs of our citizens and developed solutions that are both practical and forward-thinking."

The announcement has already generated significant discussion among lawmakers, with reactions ranging from enthusiastic support to cautious skepticism. Several key stakeholders have been briefed on the details, and congressional hearings are expected to begin next week.

Analysts predict that the implementation of these policies will have far-reaching effects on the economy, potentially creating new opportunities while also requiring adjustments in various industries. The administration has committed to working closely with affected parties to ensure a smooth transition.

Public reaction has been mixed, with some groups expressing strong support while others raise concerns about specific provisions. The coming weeks are expected to see extensive debate and discussion as the details are further examined and refined.',
 'Sarah Johnson', 'us', 'politics', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800', true, true, NOW() - INTERVAL '2 hours'),

('Supreme Court Hears Landmark Case on Constitutional Rights', generate_slug('Supreme Court Hears Landmark Case on Constitutional Rights'),
 'The highest court in the land began hearing arguments in a case that could reshape constitutional interpretation for generations.',
 'The Supreme Court convened today to hear oral arguments in what legal experts are calling one of the most significant constitutional cases in decades. The case centers on fundamental questions about individual rights and government authority.

Hundreds of spectators gathered outside the courthouse as the justices prepared to hear arguments from both sides. The case has attracted widespread attention from legal scholars, advocacy groups, and the general public.

"This case will define how we interpret constitutional protections for years to come," said a constitutional law professor. "The implications are profound."

The arguments presented today touched on core principles of American democracy, with both sides making compelling cases. The justices asked probing questions, indicating the complexity and importance of the issues at stake.

Legal observers noted that the court''s decision, expected in the coming months, could have far-reaching consequences beyond the immediate case. Similar cases in lower courts are likely to be influenced by the outcome.

The hearing is scheduled to continue tomorrow, with additional arguments and potentially more questions from the bench. Court watchers will be closely monitoring the proceedings for any indication of how the justices are leaning.',
 'Michael Chen', 'us', 'politics', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', true, true, NOW() - INTERVAL '5 hours'),

('Economic Growth Exceeds Expectations in Latest Report', generate_slug('Economic Growth Exceeds Expectations in Latest Report'),
 'New economic data shows stronger than anticipated growth, with experts pointing to several key factors driving the positive trend.',
 'The latest economic indicators released today show growth that has exceeded most analysts'' expectations. The report, covering the most recent quarter, reveals positive trends across multiple sectors of the economy.

Key metrics including GDP growth, employment rates, and consumer spending all showed improvement. Economists had predicted modest growth, but the actual numbers came in significantly higher.

"This is welcome news," said a leading economist. "The data suggests that the economy is on a solid footing, though we should remain cautious about potential challenges ahead."

The manufacturing sector showed particular strength, with increased production and new orders. The service industry also demonstrated robust performance, contributing to overall economic health.

Consumer confidence appears to be rising, with spending patterns indicating optimism about the future. This positive sentiment is reflected in increased investment in both traditional and emerging sectors.

However, experts caution that several factors could impact future growth, including global economic conditions and domestic policy decisions. The coming months will be crucial in determining whether this positive trend can be sustained.',
 'David Martinez', 'us', 'economy', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', true, false, NOW() - INTERVAL '1 day'),

-- World News
('Global Summit Addresses Climate Crisis', generate_slug('Global Summit Addresses Climate Crisis'),
 'World leaders gather for urgent discussions on climate action, with new commitments expected to be announced.',
 'Leaders from around the world convened today for a critical summit focused on addressing the escalating climate crisis. The gathering, which brings together representatives from over 100 nations, is seen as crucial for coordinating global response efforts.

The summit opened with stark warnings from climate scientists about the urgency of the situation. Recent data shows accelerating changes that require immediate and coordinated action.

"We stand at a crossroads," said the summit''s host. "The decisions we make here will determine the future of our planet for generations to come."

Several nations are expected to announce new commitments to reduce emissions and invest in renewable energy. These pledges, if fulfilled, could represent a significant step forward in the global fight against climate change.

However, significant challenges remain. Disagreements over funding, technology transfer, and responsibility for historical emissions continue to complicate negotiations. Finding common ground will require compromise from all parties.

Environmental groups are watching closely, calling for more ambitious targets and concrete action plans. They emphasize that incremental progress may not be sufficient given the scale of the challenge.

The summit is scheduled to continue for several days, with working groups addressing specific aspects of climate policy. A final communiqué is expected at the conclusion of the meetings.',
 'Emma Thompson', 'world', 'climate', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800', true, true, NOW() - INTERVAL '3 hours'),

('International Trade Agreement Reached After Months of Negotiations', generate_slug('International Trade Agreement Reached After Months of Negotiations'),
 'Diplomats announce breakthrough in complex trade talks, potentially opening new markets and strengthening economic ties.',
 'After months of intensive negotiations, representatives from multiple nations announced today that they have reached a comprehensive trade agreement. The deal, which has been in development for over a year, addresses numerous aspects of international commerce.

The agreement is expected to reduce tariffs, streamline customs procedures, and establish new frameworks for dispute resolution. Officials from participating countries hailed it as a significant achievement that will benefit all parties.

"This agreement represents a new chapter in our economic relationship," said a lead negotiator. "It creates opportunities for businesses and workers while maintaining important protections."

The negotiations had faced several obstacles, including disagreements over agricultural products, intellectual property rights, and labor standards. Finding solutions that satisfied all parties required extensive compromise and creative problem-solving.

Business groups have generally welcomed the news, though some have expressed concerns about specific provisions. Labor organizations have called for stronger protections for workers, while environmental advocates have raised questions about the agreement''s impact on sustainability.

The agreement must still be ratified by the participating nations'' legislatures, a process that could take several months. Some political observers predict that ratification may face challenges in certain countries where opposition to trade deals remains strong.',
 'James Wilson', 'world', 'trade', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', true, false, NOW() - INTERVAL '6 hours'),

-- Business
('Tech Giant Announces Major Expansion Plans', generate_slug('Tech Giant Announces Major Expansion Plans'),
 'One of the world''s largest technology companies reveals ambitious expansion strategy, including new facilities and thousands of jobs.',
 'A leading technology corporation announced today a massive expansion initiative that will create thousands of new jobs and establish new facilities in multiple locations. The plan represents one of the largest corporate expansions in recent years.

The company revealed that it will invest billions in new research and development centers, manufacturing facilities, and office spaces. The expansion will span several countries and is expected to take place over the next five years.

"We''re excited about this next phase of growth," said the company''s CEO. "This expansion will allow us to better serve our customers while creating opportunities for talented people around the world."

The announcement has been welcomed by officials in the regions where new facilities will be located. Local governments have been working to attract such investments, recognizing the economic benefits they bring.

However, the expansion has also raised questions about the company''s market dominance and its impact on smaller competitors. Some industry observers have called for regulatory scrutiny to ensure fair competition.

The company has emphasized its commitment to sustainability and community engagement as part of the expansion. It has pledged to use renewable energy for new facilities and to work closely with local communities.

Stock markets reacted positively to the news, with the company''s shares rising following the announcement. Analysts noted that the expansion signals confidence in future growth prospects.',
 'Rachel Kim', 'business', 'tech', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', true, false, NOW() - INTERVAL '8 hours'),

('Stock Market Reaches New Highs Amid Optimistic Outlook', generate_slug('Stock Market Reaches New Highs Amid Optimistic Outlook'),
 'Major indices close at record levels as investors respond to positive economic signals and corporate earnings.',
 'Stock markets surged to new record highs today, with major indices closing at all-time peaks. The gains came amid a wave of positive economic data and strong corporate earnings reports.

Investors showed confidence across multiple sectors, with technology, healthcare, and financial stocks all posting significant gains. The broad-based rally suggests optimism about the overall economic outlook.

"This is a reflection of the underlying strength we''re seeing in the economy," said a market analyst. "Companies are performing well, and the fundamentals look solid."

The rally was supported by several factors, including better-than-expected earnings from major corporations, positive economic indicators, and continued low interest rates. These conditions have created an environment that many investors find attractive.

However, some market watchers have expressed caution, noting that valuations are high by historical standards. They warn that markets can be volatile and that investors should remain diversified and focused on long-term goals.

The strong performance has been particularly beneficial for retirement accounts and other long-term investments. Many individual investors have seen their portfolios reach new highs, though experts continue to emphasize the importance of maintaining a balanced approach to investing.',
 'Thomas Anderson', 'business', 'markets', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', true, false, NOW() - INTERVAL '12 hours'),

-- Arts
('Award-Winning Film Premieres to Critical Acclaim', generate_slug('Award-Winning Film Premieres to Critical Acclaim'),
 'The highly anticipated film debuts at major festival, earning praise from critics and audiences alike.',
 'A new film that has been generating buzz for months finally premiered today, and early reactions suggest it may be one of the year''s standout productions. The film, which has already won awards at several festivals, made its official debut to an enthusiastic audience.

Critics have been effusive in their praise, highlighting the film''s direction, performances, and storytelling. Many are already predicting it will be a strong contender during awards season.

"This is filmmaking at its finest," wrote one critic. "Every element works together to create something truly special."

The film''s director and cast have been making the rounds at promotional events, sharing insights into the creative process. Their passion for the project is evident, and audiences have responded enthusiastically.

The film addresses themes that resonate with contemporary audiences while also offering timeless insights into the human condition. Its success demonstrates the continued power of cinema to move and inspire.

Industry observers note that the film''s success comes at a time when the entertainment industry is navigating significant changes. The positive reception suggests that quality storytelling remains central to audience engagement.

Plans are already underway for wider distribution, with the film expected to reach theaters nationwide in the coming weeks. Early ticket sales indicate strong interest from moviegoers.',
 'Lisa Park', 'arts', 'movies', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', true, false, NOW() - INTERVAL '1 day'),

('Museum Opens Groundbreaking New Exhibition', generate_slug('Museum Opens Groundbreaking New Exhibition'),
 'A major art museum unveils an innovative exhibition that challenges traditional perspectives and showcases contemporary voices.',
 'A prestigious art museum opened a groundbreaking new exhibition today that is already being hailed as one of the most important shows of the year. The exhibition brings together works from diverse artists and time periods, creating dialogues that challenge conventional narratives.

The curators have organized the exhibition around themes that speak to contemporary concerns while also drawing connections to historical movements. The result is a thought-provoking experience that encourages visitors to see art in new ways.

"This exhibition represents our commitment to presenting art that matters," said the museum''s director. "We want visitors to leave with new perspectives and deeper understanding."

The exhibition includes works from both established masters and emerging artists, creating a rich tapestry of artistic expression. Interactive elements allow visitors to engage with the art in innovative ways.

Art critics have praised the exhibition''s curation and its ability to make complex ideas accessible. The show has already attracted significant attention from the art world and the general public.

Educational programs accompanying the exhibition include lectures, workshops, and guided tours. The museum hopes these programs will enhance visitors'' understanding and appreciation of the works on display.

The exhibition will run for several months, giving ample opportunity for art lovers to experience it. Advance ticket sales have been strong, indicating high levels of interest.',
 'Robert Taylor', 'arts', 'visual-arts', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', true, false, NOW() - INTERVAL '2 days'),

-- Lifestyle
('New Study Reveals Benefits of Mediterranean Diet', generate_slug('New Study Reveals Benefits of Mediterranean Diet'),
 'Comprehensive research confirms the health advantages of Mediterranean eating patterns, with implications for millions.',
 'A major new study published today provides compelling evidence for the health benefits of the Mediterranean diet. The research, which followed thousands of participants over several years, found significant positive outcomes associated with this eating pattern.

The study''s findings add to a growing body of evidence supporting the Mediterranean diet as one of the healthiest approaches to nutrition. Researchers found lower rates of heart disease, improved cognitive function, and better overall health markers among participants.

"These results are significant," said the study''s lead researcher. "They provide strong support for dietary patterns that emphasize whole foods, healthy fats, and plant-based nutrition."

The Mediterranean diet emphasizes fruits, vegetables, whole grains, legumes, nuts, and olive oil, with moderate amounts of fish and poultry. It limits red meat, processed foods, and added sugars.

Nutrition experts have welcomed the findings, noting that they align with dietary guidelines that have been evolving in recent years. The study''s methodology and scale give its conclusions particular weight.

However, experts also emphasize that diet is just one component of overall health. Physical activity, sleep, stress management, and other lifestyle factors all play important roles.

The study''s authors hope their findings will inform public health recommendations and help individuals make informed choices about their nutrition. They note that the Mediterranean diet is not only healthy but also enjoyable and sustainable.',
 'Dr. Maria Rodriguez', 'lifestyle', 'health', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', true, false, NOW() - INTERVAL '1 day'),

('Travel Destination Gains Popularity Among Adventure Seekers', generate_slug('Travel Destination Gains Popularity Among Adventure Seekers'),
 'A once-overlooked region emerges as a top destination for travelers seeking authentic experiences and natural beauty.',
 'A destination that was once off the beaten path is now attracting increasing numbers of travelers, particularly those seeking adventure and authentic cultural experiences. The region offers stunning natural landscapes, rich history, and opportunities for unique activities.

Travel experts attribute the growing popularity to several factors, including improved infrastructure, increased awareness through social media, and a shift in traveler preferences toward more immersive experiences.

"This destination offers something truly special," said a travel industry analyst. "It''s authentic, beautiful, and provides experiences that are increasingly hard to find in more developed tourist areas."

The region has been working to develop sustainable tourism that benefits local communities while preserving the natural and cultural resources that make it attractive. This approach has resonated with travelers who are conscious of their impact.

Visitors can enjoy activities ranging from hiking and wildlife viewing to cultural immersion and culinary experiences. The diversity of offerings appeals to different types of travelers while maintaining the region''s unique character.

However, the increased popularity has also raised concerns about over-tourism and its potential impacts. Local authorities are working to manage visitor numbers and ensure that growth is sustainable.

Travel industry professionals are watching the region''s development closely, as it may serve as a model for other destinations seeking to balance tourism growth with preservation.',
 'Jennifer Lee', 'lifestyle', 'travel', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', true, false, NOW() - INTERVAL '3 days'),

-- Opinion
('The Future of Work Requires New Thinking', generate_slug('The Future of Work Requires New Thinking'),
 'As technology transforms industries, we must reimagine how we approach employment, education, and economic security.',
 'The rapid pace of technological change is fundamentally altering the nature of work, and our responses must be equally transformative. Traditional approaches to employment, education, and economic security are being challenged in ways that require new thinking and bold action.

The rise of artificial intelligence, automation, and remote work capabilities is creating both opportunities and disruptions. While some jobs are being eliminated, new categories of work are emerging. The challenge lies in ensuring that workers can transition and that the benefits are widely shared.

Education systems must evolve to prepare people for a world where the skills needed are constantly changing. This means emphasizing adaptability, critical thinking, and continuous learning rather than static knowledge. We need educational approaches that can keep pace with technological change.

Economic policies must also adapt. The traditional model of full-time employment with benefits may need to be supplemented or replaced with new forms of economic security. Universal basic income, portable benefits, and other innovations deserve serious consideration.

The private sector has a crucial role to play. Companies that invest in their workers'' development and provide fair compensation will be better positioned for long-term success. Those that treat workers as disposable will face increasing challenges.

This is not just an economic issue but a social one. Work provides meaning and connection for many people. As we navigate these changes, we must ensure that people have opportunities to contribute and feel valued.

The future of work will be what we make it. With thoughtful planning and bold action, we can create a world where technology enhances human potential rather than diminishing it.',
 'Dr. Amanda Foster', 'opinion', 'economy', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', true, false, NOW() - INTERVAL '4 hours'),

('Climate Action Cannot Wait for Perfect Solutions', generate_slug('Climate Action Cannot Wait for Perfect Solutions'),
 'The urgency of the climate crisis demands that we act now with the tools we have, rather than waiting for ideal circumstances.',
 'The climate crisis is accelerating, and we cannot afford to wait for perfect solutions before taking action. While we continue to develop new technologies and refine our approaches, we must deploy the tools we already have at scale.

The science is clear: every year of delay makes the problem more difficult to solve and increases the costs, both economic and human. We have technologies that can significantly reduce emissions, and we have policy tools that can accelerate their adoption.

Some argue that we should wait for better technologies or more favorable political conditions. This is a dangerous form of perfectionism that serves as an excuse for inaction. The technologies we have now, from renewable energy to energy efficiency, are sufficient to make substantial progress.

Policy action is equally important. Carbon pricing, renewable energy standards, and investment in clean infrastructure can drive change even in imperfect political environments. We must work with the systems we have while also pushing for improvements.

The private sector has shown that climate action can be both environmentally responsible and economically beneficial. Companies that have committed to ambitious climate goals are finding that these commitments drive innovation and create competitive advantages.

Individual action matters too. While systemic change is essential, the choices we make as consumers and citizens can accelerate the transition. Supporting companies with strong climate commitments and advocating for policy change are both important.

The perfect should not be the enemy of the good. We have the tools to make significant progress on climate change right now. The question is whether we have the will to use them.',
 'Prof. James Mitchell', 'opinion', 'climate', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800', true, false, NOW() - INTERVAL '7 hours'),

-- Tech
('Breakthrough in Quantum Computing Announced', generate_slug('Breakthrough in Quantum Computing Announced'),
 'Scientists achieve a major milestone in quantum computing, bringing practical applications closer to reality.',
 'Researchers announced today a significant breakthrough in quantum computing that could accelerate the development of practical applications. The achievement addresses one of the major challenges that has limited the technology''s usefulness.

The breakthrough involves improving the stability and error correction of quantum systems, which have been prone to errors that limit their practical applications. The new approach could make quantum computers more reliable and useful for real-world problems.

"This is a crucial step forward," said a leading quantum computing researcher. "It brings us closer to the point where quantum computers can solve problems that are intractable for classical computers."

Quantum computing has the potential to revolutionize fields ranging from drug discovery to cryptography to optimization problems. However, the technology has been limited by the difficulty of maintaining quantum states and correcting errors.

The research team''s approach involves new methods for error detection and correction that are more efficient than previous techniques. This could make quantum computers more practical for a wider range of applications.

Industry observers note that while significant challenges remain, this breakthrough represents important progress. Several major technology companies are investing heavily in quantum computing research, recognizing its potential.

The implications could be far-reaching. Quantum computers might eventually be able to solve problems in minutes that would take classical computers thousands of years. This could accelerate scientific discovery and enable new types of applications.

However, experts also caution that practical quantum computing is still years away. The technology requires further development, and many technical challenges remain to be solved.',
 'Alex Chen', 'tech', 'innovation', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800', true, false, NOW() - INTERVAL '10 hours'),

-- Sports
('Championship Game Delivers Thrilling Finish', generate_slug('Championship Game Delivers Thrilling Finish'),
 'In a game that will be remembered for years, the championship came down to the final seconds in dramatic fashion.',
 'In one of the most exciting championship games in recent memory, the title was decided in the final seconds after a back-and-forth contest that kept fans on the edge of their seats. The game featured outstanding performances from both teams and a finish that will be talked about for years to come.

The contest was close throughout, with neither team able to build a significant lead. The intensity and skill on display demonstrated why these teams had reached the championship stage.

"This is what championship games are supposed to be," said a sports analyst. "Both teams left everything on the field, and it came down to who could make the crucial plays at the crucial moments."

The winning team''s victory was particularly meaningful given the challenges they had overcome during the season. Injuries, close losses, and other obstacles had tested their resolve, but they persevered to reach this moment.

Fans of both teams created an electric atmosphere, with the energy in the arena reaching fever pitch as the game reached its climax. The final moments were filled with tension and excitement as the outcome hung in the balance.

The game''s conclusion was dramatic, with the winning score coming in the final seconds. The celebration that followed reflected the significance of the achievement and the emotional journey that had led to this moment.

For the losing team, the disappointment was palpable, but they had also demonstrated the character and skill that had brought them to this stage. Their performance earned respect even in defeat.

The championship represents the culmination of a long season of hard work, dedication, and teamwork. It serves as a reminder of why sports can be so compelling and meaningful.',
 'Mark Stevens', 'sports', 'championship', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', true, false, NOW() - INTERVAL '5 hours');

-- Verify articles were inserted
SELECT 
  'Demo articles inserted successfully!' as status,
  COUNT(*) as total_articles,
  COUNT(CASE WHEN published = true THEN 1 END) as published_articles,
  COUNT(CASE WHEN featured = true THEN 1 END) as featured_articles
FROM articles;

