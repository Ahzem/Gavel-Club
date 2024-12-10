import { useState } from "react";
import {
  Link as LinkIcon,
  Calendar,
  AlertCircle,
//   Users,
//   CheckCircle,
//   XCircle,
} from "lucide-react";

interface MembershipConfig {
  isOpen: boolean;
  formUrl: string;
  closeDate: string;
}

// Utility function to handle Google Form URL
const transformGoogleFormUrl = (url: string): string | null => {
  try {
    // Extract form ID using regex
    const formIdMatch = url.match(/forms\/d\/e\/([\w-]+)/);
    if (!formIdMatch) return null;

    const formId = formIdMatch[1];
    return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
  } catch {
    return null;
  }
};

export function MembershipManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [config, setConfig] = useState<MembershipConfig>({
    isOpen: true,
    formUrl: "",
    closeDate: new Date().toISOString().split("T")[0],
  });

  const handleUrlChange = (url: string) => {
    const transformedUrl = transformGoogleFormUrl(url);
    if (!url) {
      setError("");
      setConfig({ ...config, formUrl: "" });
      return;
    }

    if (!transformedUrl) {
      setError("Please enter a valid Google Form URL");
      return;
    }

    setError("");
    setConfig({ ...config, formUrl: transformedUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Validate form URL
      if (!config.formUrl) {
        throw new Error("Please enter a Google Form URL");
      }

      const response = await fetch("/api/membership/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error("Failed to update configuration");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mm-container">
      <div className="mm-header">
        <div className="mm-header__title-group">
          <h2 className="mm-header__title">Membership Applications</h2>
          <p className="mm-header__subtitle">
            Control application intake and form settings
          </p>
        </div>
      </div>

      {/* <div className="mm-stats">
        <div className="mm-stats__card">
          <div className="mm-stats__icon mm-stats__icon--total">
            <Users size={24} />
          </div>
          <div className="mm-stats__content">
            <span className="mm-stats__number">124</span>
            <span className="mm-stats__label">Total Applications</span>
          </div>
        </div>
        <div className="mm-stats__card">
          <div className="mm-stats__icon mm-stats__icon--approved">
            <CheckCircle size={24} />
          </div>
          <div className="mm-stats__content">
            <span className="mm-stats__number">98</span>
            <span className="mm-stats__label">Approved</span>
          </div>
        </div>
        <div className="mm-stats__card">
          <div className="mm-stats__icon mm-stats__icon--pending">
            <XCircle size={24} />
          </div>
          <div className="mm-stats__content">
            <span className="mm-stats__number">26</span>
            <span className="mm-stats__label">Pending Review</span>
          </div>
        </div>
      </div> */}

      <div className="mm-config">
        <form onSubmit={handleSubmit} className="mm-form">
          <div className="mm-form__section">
            <div className="mm-form__section-header">
              <h3 className="mm-form__section-title">Application Status</h3>
              <p className="mm-form__section-desc">
                Control whether new applications can be submitted
              </p>
            </div>

            <div className="mm-toggle">
              <label className="mm-toggle__switch">
                <input
                  type="checkbox"
                  checked={config.isOpen}
                  onChange={(e) =>
                    setConfig({ ...config, isOpen: e.target.checked })
                  }
                  placeholder="Application Status"
                />
                <span className="mm-toggle__slider"></span>
              </label>
              <div className="mm-toggle__status">
                <span
                  className={`mm-toggle__indicator ${
                    config.isOpen ? "mm-toggle__indicator--active" : ""
                  }`}
                >
                  {config.isOpen
                    ? "Accepting Applications"
                    : "Applications Closed"}
                </span>
              </div>
            </div>
          </div>

          <div className="mm-form__section">
            <div className="mm-form__section-header">
              <h3 className="mm-form__section-title">Form Configuration</h3>
              <p className="mm-form__section-desc">
                Set up the application form and deadline
              </p>
            </div>

            <div className="mm-form__grid">
              <div className="mm-form__field">
                <label className="mm-form__label">
                  <LinkIcon size={16} />
                  Google Form URL
                </label>
                <div className="mm-form__input-wrapper">
                  <input
                    type="url"
                    value={config.formUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="Paste Google Form URL here"
                    className={`mm-form__input ${
                      error ? "mm-form__input--error" : ""
                    }`}
                    required
                  />
                  {error && (
                    <div className="mm-form__error">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="mm-form__field">
                <label className="mm-form__label">
                  <Calendar size={16} />
                  Closing Date
                </label>
                <input
                  type="date"
                  value={config.closeDate}
                  onChange={(e) =>
                    setConfig({ ...config, closeDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="mm-form__input"
                  required
                  placeholder="Closing Date"
                />
              </div>
            </div>
          </div>

          {success && (
            <div className="mm-form__success">Settings saved successfully!</div>
          )}

          <div className="mm-form__actions">
            <button
              type="submit"
              className={'button button--primary'}
              disabled={loading || !!error}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {config.formUrl && (
          <div className="mm-preview">
            <h3 className="mm-preview__title">Form Preview</h3>
            <div className="mm-preview__frame">
              <iframe
                src={config.formUrl}
                className="mm-preview__iframe"
                title="Membership Application Form Preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
