import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    // Check for some text that should exist in the Footer
    // Based on previous knowledge it might have "Imogiri" or similar
    expect(screen.getByRole('contentinfo') || screen.getByText(/imogiri/i)).toBeInTheDocument();
  });
});
