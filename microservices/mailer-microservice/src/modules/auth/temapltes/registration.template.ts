export const registrationTemplate = (token: string) => {
  return `
          <div>
              <a href="${
                process.env.FRONT_URL || 'http://localhost:3000'
              }/sign-up/${token}">${
                process.env.FRONT_URL || 'http://localhost:3000'
              }/sign-up/${token}<a/>
          </div>
      `;
};
