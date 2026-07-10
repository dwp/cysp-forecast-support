//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/vnics/nino', function (req, res) {
  
  req.session.data.nino = req.session.data.nino?.trim().toUpperCase()
const nino = req.session.data['nino']

    if (nino == 'RN000007A') {
      res.redirect ('/vnics/exclusions/deceased')
  } else if (nino === 'RN000006A') {
        res.redirect('/vnics/exclusions/isle-of-man')
  } else if (nino === 'RN000005A') {
        res.redirect('/vnics/cope/checking-national-insurance-record')
  } else {
      res.redirect ('/vnics/route')
  } 
});

router.post('/vnics/choose-option', function (req, res) {
    const option = req.body['howCanIHelp']
    const nino = req.session.data['nino']
      if (!option) {
        delete req.session.data['howCanIHelp']
        return res.render ('/vnics/route', {
        error: true
    })}    
      if (nino === 'RN000004A') {
        res.redirect ('/vnics/forecast-enquiry/forecast-enquiry-rre')
    } else if (nino === 'RN000007A') {
        res.redirect ('/vnics/cope/checking-national-insurance-record')
    } else if (nino === 'RN000003A') {
        res.redirect ('/vnics/forecast-enquiry/RN000003A')
    } else if (nino === 'RN000002A') {
        res.redirect ('/vnics/forecast-enquiry/RN000002A')
    } else if (nino === 'RN000001A') {
        res.redirect ('/vnics/forecast-enquiry/RN000001A')
    } else if (option === 'forecast' ) {
        res.redirect ('/vnics/alternative-format')
    } else if (option === 'enquiry') { 
        res.redirect ('/vnics/forecast-enquiry')}
   
});  

router.post('/vnics/alternative-format', function (req, res) {

  const formatRequired = req.session.data['alternativeFormatRequired']
  const option = req.session.data['alternativeFormat']

  if (formatRequired === 'no') {
    return res.redirect('/vnics/forecast-request')
  }

    if (option === 'audio-format') {
      return res.redirect('/vnics/alternative-format/audio-format')
  } else if (option === 'large-print') {
      return res.redirect('/vnics/alternative-format/large-format')
  } else if (option === 'braille') {
      return res.redirect('/vnics/alternative-format/braille')
  } else if (option === 'other-adjustments-requested') {
      return res.redirect('/vnics/alternative-format/other-adjustment-requested')
  } else {
    // fallback if "yes" selected but nothing chosen
      return res.redirect('/vnics/alternative-format')
  }
});

router.post('/vnics/own-forecast', function (req, res) {
    const option = req.session.data['own-forecast']

    if (option === 'yes' ) {
        res.redirect ('/vnics/forecast-request/customer')
    }  else if (option === 'no') 
        { res.redirect ('/vnics/forecast-request/3rd-party-recorded')}
     else {
        //fallback if nothing is selected
        res.redirect ('/vnics/forecast-request') }       
});

router.post('/vnics/legal-representation', function (req, res) {
    const option = req.session.data['inSearchlight']

    if (option === 'yes' ) {
        res.redirect ('/vnics/forecast-request/3rd-party-details')
    }  else if (option === 'no') 
        { res.redirect ('/vnics/forecast-request/3rd-party-letter')}
     else {
        //fallback if nothing is selected
        res.redirect ('/vnics/forecast-request/3rd-party-recorded') }       
});

router.post('/vnics/pre-deadline-gaps/improve-state-pension', function (req, res) {
  const nino = req.session.data['nino']

    if (nino === 'RN000002A' ) {
        res.redirect ('/vnics/forecast-enquiry/improve-state-pension/RN000002A')
    }  else if (nino === 'RN000003A') 
        { res.redirect ('/vnics/forecast-enquiry/improve-state-pension/RN000003A')}
     else {
        //fallback if nothing is selected
        res.redirect ('/vnics/forecast-enquiry/improve-state-pension') }       
});
