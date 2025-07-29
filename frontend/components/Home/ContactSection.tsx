"use client";
import React, { useState, useEffect } from "react";

const ContactSection: React.FC = () => {
  return (
    <section style={{
      padding: 'clamp(1rem, 3vw, 2rem) 0',
      position: 'relative',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 clamp(0.5rem, 2vw, 1rem)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
          }}>
            Book a Meeting
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            Schedule a 15-minute meeting to discuss your project
          </p>
        </div>
        
        {/* Full Width Calendar */}
        <div style={{
          background: '#ffffff',
          overflow: 'hidden',
          position: 'relative',
          height: 'clamp(500px, 80vh, calc(100vh - 200px))',
          minHeight: 'clamp(400px, 60vh, 700px)'
        }}>
          <iframe
            src="https://tidycal.com/katikijenny09/15-minute-meeting?embed=true&theme_editor=false&branding=minimal"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Schedule Meeting"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
