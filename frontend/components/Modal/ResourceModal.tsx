"use client";
import React from "react";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  const getCategoryColor = (slug: string) => {
    const colorMap: { [key: string]: string } = {
      'tips': '#f59e0b',
      'guide': '#2ec4f1',
      'case-study': '#22c55e',
      'news': '#8b5cf6',
      'tutorial': '#ef4444'
    };
    return colorMap[slug] || '#64748b';
  };

  const getCategoryName = (slug: string) => {
    const categoryMap: { [key: string]: string } = {
      'tips': 'Tips & Tricks',
      'guide': 'Guides',
      'case-study': 'Case Studies',
      'news': 'Industry News',
      'tutorial': 'Tutorials'
    };
    return categoryMap[slug] || slug;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Mock content based on the post title
  const getPostContent = (title: string) => {
    if (title.includes("WhatsApp Hacks")) {
      return `
        <h2>5 Proven WhatsApp Strategies That Double Sales</h2>
        
        <p>WhatsApp has become the ultimate sales channel for businesses worldwide. With over 2 billion users, it offers unprecedented reach and engagement rates. Here are the 5 most effective strategies we've seen work consistently:</p>
        
        <h3>1. Personalized Welcome Messages</h3>
        <p>First impressions matter. Create a warm, personalized welcome message that makes customers feel valued from the moment they reach out. Use their name and acknowledge their specific inquiry.</p>
        
        <h3>2. Quick Response Templates</h3>
        <p>Speed is crucial in sales. Set up smart templates for common questions while maintaining a personal touch. Customers expect responses within 5 minutes on WhatsApp.</p>
        
        <h3>3. Visual Product Catalogs</h3>
        <p>Leverage WhatsApp's catalog feature to showcase your products with high-quality images, descriptions, and prices. Visual selling increases conversion rates by 67%.</p>
        
        <h3>4. Follow-up Automation</h3>
        <p>Create strategic follow-up sequences for different customer segments. A well-timed follow-up can recover 35% of potentially lost sales.</p>
        
        <h3>5. Group Broadcasting</h3>
        <p>Use broadcast lists to send targeted offers to segmented customer groups. This approach generates 3x higher engagement than traditional email marketing.</p>
        
        <h3>Pro Tip: Integration is Key</h3>
        <p>Connect WhatsApp with your CRM and analytics tools to track performance and optimize your approach continuously.</p>
      `;
    } else if (title.includes("AI for SMEs")) {
      return `
        <h2>AI Implementation Guide for Small & Medium Enterprises</h2>
        
        <p>Artificial Intelligence isn't just for big tech companies. SMEs can leverage AI to compete with larger businesses and streamline operations effectively.</p>
        
        <h3>Understanding AI for Business</h3>
        <p>AI can automate repetitive tasks, provide insights from data, and enhance customer experiences. For SMEs, the focus should be on practical, cost-effective solutions.</p>
        
        <h3>Top AI Applications for SMEs</h3>
        
        <h4>Customer Service Automation</h4>
        <p>Implement chatbots to handle common inquiries 24/7. This reduces response time and frees up your team for complex issues.</p>
        
        <h4>Sales Process Optimization</h4>
        <p>Use AI to score leads, predict customer behavior, and personalize sales approaches. This can increase conversion rates by up to 40%.</p>
        
        <h4>Inventory Management</h4>
        <p>AI can predict demand patterns, optimize stock levels, and reduce waste. This is particularly valuable for retail and manufacturing SMEs.</p>
        
        <h3>Getting Started: A Step-by-Step Approach</h3>
        <ol>
          <li>Identify repetitive tasks in your business</li>
          <li>Start with one simple AI tool (like a chatbot)</li>
          <li>Measure results and gather feedback</li>
          <li>Gradually expand to other areas</li>
          <li>Train your team on AI tools</li>
        </ol>
        
        <h3>Budget-Friendly AI Tools</h3>
        <p>Many AI solutions are now available at SME-friendly prices. Cloud-based platforms offer scalable solutions that grow with your business.</p>
      `;
    } else if (title.includes("CafeKart")) {
      return `
        <h2>CafeKart Success Story: 60% Cost Reduction Through Automation</h2>
        
        <p>CafeKart, a popular food delivery service, was struggling with high customer support costs and slow response times. Here's how they transformed their operations.</p>
        
        <h3>The Challenge</h3>
        <p>Before automation, CafeKart faced several critical issues:</p>
        <ul>
          <li>Average response time: 45 minutes</li>
          <li>Support team of 15 agents handling 500+ daily queries</li>
          <li>High operational costs eating into profit margins</li>
          <li>Customer satisfaction dropping due to delays</li>
        </ul>
        
        <h3>The Solution: WhatsApp Automation</h3>
        <p>CafeKart implemented Sahyogi's WhatsApp automation platform to revolutionize their customer support.</p>
        
        <h4>Key Features Implemented:</h4>
        <ul>
          <li><strong>Smart Chatbots:</strong> Handle order inquiries, track deliveries, and process refunds</li>
          <li><strong>Automated Workflows:</strong> Route complex issues to human agents</li>
          <li><strong>Real-time Updates:</strong> Send order confirmations and delivery updates</li>
          <li><strong>FAQ Automation:</strong> Instant answers to common questions</li>
        </ul>
        
        <h3>The Results</h3>
        <p>Within 3 months of implementation, CafeKart achieved remarkable improvements:</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h4>📊 Key Metrics:</h4>
          <ul>
            <li><strong>60% reduction</strong> in support costs</li>
            <li><strong>90% faster</strong> response times (45 min → 4.5 min)</li>
            <li><strong>80% of queries</strong> resolved automatically</li>
            <li><strong>35% increase</strong> in customer satisfaction</li>
            <li><strong>Support team reduced</strong> from 15 to 6 agents</li>
          </ul>
        </div>
        
        <h3>Implementation Timeline</h3>
        <p><strong>Week 1-2:</strong> Setup and configuration of basic chatbot flows</p>
        <p><strong>Week 3-4:</strong> Training team and testing automation</p>
        <p><strong>Week 5-8:</strong> Full deployment and optimization</p>
        <p><strong>Month 3:</strong> Complete integration and results measurement</p>
        
        <h3>Key Learnings</h3>
        <p>"The automation didn't replace our team; it empowered them to focus on complex customer needs while handling routine queries automatically." - Priya Sharma, CafeKart Operations Manager</p>
        
        <h3>Ready to Transform Your Support?</h3>
        <p>Like CafeKart, your business can achieve significant cost savings and improved customer satisfaction through smart automation.</p>
      `;
    }
    return `<p>Content for "${title}" will be loaded here...</p>`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}
    onClick={onClose}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '800px',
        maxHeight: '90vh',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
          color: '#ffffff',
          padding: '2rem',
          position: 'relative'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ✕
          </button>

          {/* Category Badge */}
          <div style={{
            display: 'inline-block',
            background: getCategoryColor(post.category),
            color: '#ffffff',
            padding: '0.5rem 1.2rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            {getCategoryName(post.category)}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            opacity: 0.9
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 600
              }}>
                {post.author?.name?.charAt(0) || 'S'}
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffffff' }}>
                  {post.author?.name}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, color: '#ffffffff' }}>
                  {post.author?.role}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#ffffffff' }}>
              {post.readTime}
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              {formatDate(post.publishDate)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '3rem',
          overflow: 'auto',
          maxHeight: 'calc(90vh - 200px)',
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#1a1a1a'
        }}>
          <div
            className="resource-modal-content"
            style={{
              color: '#1a1a1a'
            }}
            dangerouslySetInnerHTML={{
              __html: getPostContent(post.title)
            }}
          />

          {/* Tags */}
          <div style={{ 
            display: 'flex', 
            gap: '0.8rem', 
            flexWrap: 'wrap',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            {post.tags?.map((tag: string, tagIndex: number) => (
              <span key={tagIndex} style={{
                background: '#f1f5f9',
                color: '#1a355e',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 500
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '2rem 3rem',
          background: '#f8fafc',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Found this helpful? Share it with your team!
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #2ec4f1 0%, #6ee7f7 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
