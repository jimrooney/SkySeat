const convertHTMLtoPDF = (htmlContent, fileName, recipientEmail) => {
  if (!htmlContent) {
    htmlContent = `<div>No content recieved</div>`
  }
  if (!fileName) {
    fileName = `PDF_Attachment.pdf`
  }
  if (!recipientEmail) {
    recipientEmail = `jim@skyseat.co.nz`
  }
  htmlContent = include("CSS") + htmlContent
  const blob = Utilities.newBlob(htmlContent, MimeType.HTML)
  blob.setName(fileName)

  const emailSubject = "The PDF file is attached"

  MailApp.sendEmail({
    to: recipientEmail,
    subject: emailSubject,
    htmlBody: htmlContent,
    attachments: [blob.getAs(MimeType.PDF)],
  })
}
