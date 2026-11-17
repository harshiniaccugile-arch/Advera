'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CareerApplySliderProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle?: string;
  isHold?: boolean;
}

export default function CareerApplySlider({
  isOpen,
  onClose,
  roleTitle = 'Brand and Graphic Designer',
  isHold = false
}: CareerApplySliderProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    organization: '',
    currentCtc: '',
    expectedSalary: '',
    experience: '',
    noticePeriod: '',
    linkedin: '',
    hearAbout: '',
    referredBy: '',
    consentAccepted: false
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consentAccepted) {
      alert('Please accept the Online Application Consent before submitting.');
      return;
    }

    if (!resumeFile) {
      alert('Please attach your resume (.pdf, .doc, .docx).');
      return;
    }

    if (!isCaptchaChecked) {
      alert('Please verify the "I\'m not a robot" security check.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const fd = new FormData();
    fd.append('role', roleTitle);
    fd.append('fullName', formData.fullName);
    fd.append('email', formData.email);
    fd.append('phone', formData.phone);
    fd.append('location', formData.location);
    fd.append('organization', formData.organization);
    fd.append('currentCtc', formData.currentCtc);
    fd.append('expectedSalary', formData.expectedSalary);
    fd.append('experience', formData.experience);
    fd.append('noticePeriod', formData.noticePeriod);
    fd.append('linkedin', formData.linkedin);
    fd.append('hearAbout', formData.hearAbout);
    fd.append('referredBy', formData.referredBy);
    if (resumeFile) fd.append('resume', resumeFile);
    if (coverFile) fd.append('coverLetter', coverFile);

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();

      if (data.ok || data.success) {
        setSubmitStatus({
          type: 'ok',
          text: 'Thank you! Your application has been submitted and sent to harshini.accugile@gmail.com successfully.'
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          organization: '',
          currentCtc: '',
          expectedSalary: '',
          experience: '',
          noticePeriod: '',
          linkedin: '',
          hearAbout: '',
          referredBy: '',
          consentAccepted: false
        });
        setResumeFile(null);
        setCoverFile(null);
        setIsCaptchaChecked(false);
      } else {
        throw new Error(data.error || 'Failed to submit application');
      }
    } catch (err: any) {
      setSubmitStatus({
        type: 'err',
        text: err?.message || 'Could not send application. Please try again or email us directly at harshini.accugile@gmail.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="career-slider-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="career-slider-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="slider-top-bar">
          <div className="slider-apply-tag">APPLY ONLINE</div>
          <button className="slider-close-btn" onClick={onClose} aria-label="Close form" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="esc-hint">Esc</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="slider-title-wrap">
          <h2 className="slider-job-title">
            <span className="slider-job-title-underline">
              {roleTitle} {isHold && <span className="on-hold-tag">(Position temporarily on-hold)</span>}
            </span>
          </h2>
        </div>

        {submitStatus && (
          <div className={`slider-status-alert ${submitStatus.type === 'ok' ? 'status-success' : 'status-error'}`}>
            <p>{submitStatus.text}</p>
          </div>
        )}

        {/* Main Application Form */}
        <form onSubmit={handleSubmit} className="career-apply-form">
          {/* Row 1: Full Name */}
          <div className="form-full-row">
            <div className="form-floating-group">
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="fullName">
                Full Name <span className="req-text">(required)</span>
              </label>
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="form-two-col">
            <div className="form-floating-group">
              <input
                type="email"
                name="email"
                id="careerEmail"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="careerEmail">
                Your Email <span className="req-text">(required)</span>
              </label>
            </div>
            <div className="form-floating-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="phone">
                Phone Number <span className="req-text">(required)</span>
              </label>
            </div>
          </div>

          {/* Row 3: Location & Current Organization */}
          <div className="form-two-col">
            <div className="form-floating-group">
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="location">
                Location <span className="req-text">(required)</span>
              </label>
            </div>
            <div className="form-floating-group">
              <input
                type="text"
                name="organization"
                id="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="organization">
                Current Organization
              </label>
            </div>
          </div>

          {/* Row 4: Current CTC & Expected Salary */}
          <div className="form-two-col">
            <div className="form-floating-group">
              <input
                type="text"
                name="currentCtc"
                id="currentCtc"
                required
                value={formData.currentCtc}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="currentCtc">
                Current CTC <span className="req-text">(required)</span>
              </label>
            </div>
            <div className="form-floating-group">
              <input
                type="text"
                name="expectedSalary"
                id="expectedSalary"
                required
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="expectedSalary">
                Expected Salary <span className="req-text">(required)</span>
              </label>
            </div>
          </div>

          {/* Row 5: Years of Experience & Notice Period */}
          <div className="form-two-col">
            <div className="form-floating-group">
              <input
                type="text"
                name="experience"
                id="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="experience">
                Years of Experience <span className="req-text">(required)</span>
              </label>
            </div>
            <div className="form-floating-group">
              <input
                type="text"
                name="noticePeriod"
                id="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="noticePeriod">
                Notice Period
              </label>
            </div>
          </div>

          {/* Row 6: LinkedIn URL */}
          <div className="form-full-row">
            <div className="form-floating-group">
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="linkedin">
                LinkedIn URL
              </label>
            </div>
          </div>

          {/* Row 7: How did you hear & Referred by */}
          <div className="form-two-col">
            <div className="form-floating-group">
              <input
                type="text"
                name="hearAbout"
                id="hearAbout"
                value={formData.hearAbout}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="hearAbout">
                How did you hear about this opportunity?
              </label>
            </div>
            <div className="form-floating-group">
              <input
                type="text"
                name="referredBy"
                id="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="referredBy">
                If you were referred, by who?
              </label>
            </div>
          </div>

          {/* File Attachments */}
          <div className="form-attachments-row">
            <div className="attachment-slot">
              <input
                type="file"
                ref={resumeInputRef}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="attachment-btn"
                onClick={() => resumeInputRef.current?.click()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                <span>
                  {resumeFile ? resumeFile.name : 'Attach Resume - .doc, .docx, .pdf (required)'}
                </span>
              </button>
            </div>

            <div className="attachment-slot">
              <input
                type="file"
                ref={coverInputRef}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="attachment-btn"
                onClick={() => coverInputRef.current?.click()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                <span>
                  {coverFile ? coverFile.name : 'Attach Cover Letter - .doc, .docx, .pdf'}
                </span>
              </button>
            </div>
          </div>

          {/* Consent Checkbox Box */}
          <div className="consent-box">
            <label className="consent-label">
              <input
                type="checkbox"
                name="consentAccepted"
                checked={formData.consentAccepted}
                onChange={handleChange}
                required
              />
              <span className="consent-text">
                I accept. Your privacy is really important to us. Selecting &quot;I accept&quot; confirms that you have read and accepted Accugile&apos;s{' '}
                <a
                  href="https://accugile.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="consent-link"
                >
                  Online Application Consent
                </a>
                . Your consent is a necessary prerequisite to submitting your application online.
              </span>
            </label>
          </div>

          {/* Captcha & Apply Now Button Row */}
          <div className="submit-action-row">
            {/* Custom reCAPTCHA style box */}
            <div
              className={`recaptcha-card ${isCaptchaChecked ? 'recaptcha-checked' : ''}`}
              onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
            >
              <div className="recaptcha-left">
                <div className={`recaptcha-checkbox ${isCaptchaChecked ? 'checked' : ''}`}>
                  {isCaptchaChecked && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="recaptcha-text">I&apos;m not a robot</span>
              </div>
              <div className="recaptcha-brand">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="1.8">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                <span className="recaptcha-subtext">reCAPTCHA</span>
              </div>
            </div>

            {/* APPLY NOW Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="apply-now-btn"
            >
              {isSubmitting ? 'SENDING...' : 'APPLY NOW'}
            </button>
          </div>

          {/* Disclaimer footer */}
          <div className="recruiter-disclaimer">
            Candidates only! It is NOT OK for recruiters or others to solicit this company.
          </div>
        </form>
      </div>
    </div>
  );
}

