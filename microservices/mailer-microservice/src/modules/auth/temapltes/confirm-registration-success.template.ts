export const confirmRegistrationSuccessTemplate = (email: string) => {
    return `
          <div>
              <h3>Dear ${email},</h3><br>
              <p>Your account successfully confirmed</p>
          </div>
      `;
  };