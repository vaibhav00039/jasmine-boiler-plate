import Page from './page.js'

class PreRetirementCalculatorPage extends Page 
{
    // Pre-retirement calculator Input fields - locator
    get page_intro() { return $('#calculator-intro-section') }
    get current_age() { return $('#current-age') }
    get retirement_age() { return $('#retirement-age') }
    get current_income() { return $('#current-income') }
    get spouse_income() { return $('#spouse-income') }
    get current_savings() { return $('input#current-total-savings') }
    get annual_saving_percentage() { return $('input#current-annual-savings') }
    get savings_increase_rate() { return $('input#savings-increase-rate') }
    get yes_social_benefits() { return $('[for="yes-social-benefits"]') }
    get no_social_benefits() { return $('[for="no-social-benefits"]') }
    get married() { return $('[for="married"]') }
    get single() { return $('[for="single"]') }
    get social_security_amount() { return $('input#social-security-override') }
    get submit_btn() { return $('//button[text()="Calculate"]') }

    // Set default value page locators
    get set_default_btn() { return $('[data-target="#default-values-modal"]')}
    get additional_income() {return $('[id="additional-income"]')}
    get retirement_duration() { return $('[id="retirement-duration"]')}
    get include_inflation_radio() {return $('[for="include-inflation"]')}
    get exclude_inflation_radio() {return $('[for="exclude-inflation"]')}
    get expected_inflation_rate() {return $('[id="expected-inflation-rate"]')}
    get retirement_annual_income() {return $('[id="retirement-annual-income"]')}
    get pre_retirement_roi() {return $('[id="pre-retirement-roi"]')}
    get post_retirement_roi() {return $('[id="post-retirement-roi"]')}
    get save_default() {return $('//button[text()="Save changes"]')}


    // Results page - locator
    get results_message() { return $('p#result-message strong') }
    get email_btn() { return $('//button[contains(text() , "Email")]') }
    get retirement_amount() { return $('[id="retirement-amount-results"]') }
    get current_saving_result_page() { return $('[id="current-savings-results"]') }
    get miniumum_needed_to_retire() { return $('//th[contains(text() , "Minimum needed to retire")]') }

    // Error Messages -Input fields - locator
    get page_warning() { return $('[id="calculator-input-alert-desc"]') }
    get invalid_current_age_error() { return $('[id="invalid-current-age-error"]') }
    get invalid_retirement_age_error() { return $('#invalid-retirement-age-error') }
    get invalid_current_income_error() { return $('#invalid-current-income-error') }
    get invalid_current_total_savings_error() { return $('#invalid-current-total-savings-error') }
    get invalid_current_annual_savings_error() { return $('#invalid-current-annual-savings-error') }
    get invalid_savings_increase_rate_error() { return $('#invalid-savings-increase-rate-error') }

    open (url: string ) {
        // open the given url
        return super.open(url)
    }

}

export default new PreRetirementCalculatorPage()

