import PreRetirementPage from '../pageobjects/PreRetirementCalculatorPage.js'
import retirementData from "../data/preRetirementCalculatorPageTestData.json" assert {type: "json"}

describe('Securian Financial - Retirement Calculator Testing', () => {

    it('Validating error message gets displayed for mandatory fields', async () => {
        await PreRetirementPage.open(retirementData.url)
        await browser.maximizeWindow()
        await PreRetirementPage.submit_btn.click()
        // Validating error message gets displayed for mandatory fields
        // when submit form with default values
        await expect(PreRetirementPage.page_warning).toBeDisplayed()
        await expect(PreRetirementPage.page_warning).toHaveText('Please fill out all required fields')
        await expect(PreRetirementPage.invalid_current_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_age_error).toHaveText('Input required')
        await expect(PreRetirementPage.invalid_retirement_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_retirement_age_error).toHaveText('Input required')
        await expect(PreRetirementPage.invalid_current_income_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_income_error).toHaveText('Input required')
        await expect(PreRetirementPage.invalid_current_total_savings_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_total_savings_error).toHaveText('Input required')
        await expect(PreRetirementPage.invalid_current_annual_savings_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_annual_savings_error).toHaveText('Input required')
        await expect(PreRetirementPage.invalid_savings_increase_rate_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_savings_increase_rate_error).toHaveText('Input required')
    });

    it('Validating error messages for age fields when enter invalid data', async () => {
        await PreRetirementPage.open(retirementData.url)
        await browser.maximizeWindow()
        await PreRetirementPage.current_age.setValue(retirementData.current_age_0)
        await PreRetirementPage.retirement_age.setValue(retirementData.retirement_age_0)
        await PreRetirementPage.current_income.click()
        await PreRetirementPage.current_income.setValue(retirementData.current_income_0)
        await PreRetirementPage.spouse_income.click()
        await PreRetirementPage.spouse_income.setValue(retirementData.spouse_income_0)
        await PreRetirementPage.current_savings.click()
        await PreRetirementPage.current_savings.setValue(retirementData.current_savings_0)
        await PreRetirementPage.annual_saving_percentage.click()
        await PreRetirementPage.annual_saving_percentage.setValue(retirementData.annual_saving_percentage_0)
        await PreRetirementPage.savings_increase_rate.click()
        await PreRetirementPage.savings_increase_rate.setValue(retirementData.savings_increase_rate_0)
        await PreRetirementPage.submit_btn.click()
        // Validating error message when user provide current & retirement age as 0 
        await expect(PreRetirementPage.page_warning).toBeDisplayed()
        await expect(PreRetirementPage.page_warning).toHaveText('Please fill out all required fields')
        await expect(PreRetirementPage.invalid_current_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_age_error).toHaveText('Age cannot be 0')
        await expect(PreRetirementPage.invalid_retirement_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_retirement_age_error).toHaveText('Age cannot be 0')
        // Validating error message when user provide current & retirement age more then 120
        await PreRetirementPage.current_age.setValue(retirementData.current_age_121)
        await PreRetirementPage.retirement_age.setValue(retirementData.retirement_age_121)
        await PreRetirementPage.submit_btn.click()
        await expect(PreRetirementPage.invalid_current_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_current_age_error).toHaveText('Age cannot be greater than 120')
        await expect(PreRetirementPage.invalid_retirement_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_retirement_age_error).toHaveText('Age cannot be greater than 120')
        // Validating error message - when current age is larger then retirement age
        await PreRetirementPage.current_age.setValue(retirementData.current_age_22)
        await PreRetirementPage.retirement_age.setValue(retirementData.retirement_age_12)
        await PreRetirementPage.submit_btn.click()
        await expect(PreRetirementPage.invalid_retirement_age_error).toBeDisplayed()
        await expect(PreRetirementPage.invalid_retirement_age_error).toHaveText('Planned retirement age must be greater than current age')
        // validating fields for social security does not display when click radio button - no options 
        await (await PreRetirementPage.no_social_benefits).click()
        await (await PreRetirementPage.yes_social_benefits).click()
        await (await PreRetirementPage.no_social_benefits).click()
        await expect(PreRetirementPage.social_security_amount).not.toBeDisplayed()
        await expect(PreRetirementPage.single).not.toBeDisplayed()
    });

    it('Validating retirement amount generated when user input all data', async () => {
        // End to end flow 
        // calculating retirement amount generated when user provide all values
        await PreRetirementPage.open(retirementData.url)
        await browser.maximizeWindow()
        // setting up the values in mandatory and non-mandotry fields
        await PreRetirementPage.current_age.setValue(retirementData.current_age_40)
        await PreRetirementPage.retirement_age.setValue(retirementData.retirement_age_68)
        await PreRetirementPage.current_income.click()
        await PreRetirementPage.current_income.setValue(retirementData.current_income)
        await await PreRetirementPage.spouse_income.click()
        await PreRetirementPage.spouse_income.setValue(retirementData.spouse_income)
        await PreRetirementPage.current_savings.click()
        await PreRetirementPage.current_savings.setValue(retirementData.current_savings)
        await PreRetirementPage.annual_saving_percentage.click()
        await PreRetirementPage.annual_saving_percentage.setValue(retirementData.annual_saving_percentage)
        await PreRetirementPage.savings_increase_rate.click()
        await PreRetirementPage.savings_increase_rate.setValue(retirementData.savings_increase_rate)
        await (await PreRetirementPage.no_social_benefits).click()
        await (await PreRetirementPage.yes_social_benefits).click()
        await (await PreRetirementPage.social_security_amount).isClickable()
        await (await PreRetirementPage.social_security_amount).click()
        // setting up the values in social security income
        await PreRetirementPage.social_security_amount.setValue(retirementData.social_security_amount)
        await PreRetirementPage.single.click()
        await PreRetirementPage.married.click()
        await PreRetirementPage.submit_btn.click()
        await PreRetirementPage.results_message.waitForDisplayed()
        await expect(PreRetirementPage.results_message).toHaveText('$833 a month.')
        await expect(PreRetirementPage.email_btn).toBeDisplayed()
        await expect(PreRetirementPage.email_btn).toBeDisplayed()
        await expect(PreRetirementPage.miniumum_needed_to_retire).toBeDisplayed()
        await expect(PreRetirementPage.retirement_amount).toHaveText('$2,773,534.82')
        await expect(PreRetirementPage.current_saving_result_page).toHaveText('$500,000.00')
    });

    it('Setting up default values and calculating the amount', async () => {
        await PreRetirementPage.open(retirementData.url)
        await browser.maximizeWindow()
        // Setting up default values
        await PreRetirementPage.set_default_btn.click()
        await (await PreRetirementPage.additional_income).isClickable()
        await PreRetirementPage.additional_income.click()
        await PreRetirementPage.additional_income.setValue('10000')
        await PreRetirementPage.retirement_duration.click()
        await PreRetirementPage.retirement_duration.setValue('10')
        await PreRetirementPage.retirement_annual_income.setValue('10')
        await PreRetirementPage.pre_retirement_roi.setValue('1')
        await PreRetirementPage.post_retirement_roi.setValue('2')
        await PreRetirementPage.save_default.click()
        await (await PreRetirementPage.set_default_btn).isClickable()
        await PreRetirementPage.set_default_btn.click()
        await (await PreRetirementPage.additional_income).isClickable()
        await PreRetirementPage.additional_income.click()
        await PreRetirementPage.additional_income.setValue('10000')
        await PreRetirementPage.save_default.click()
        // adding mandatory & non-mandatory fields values
        await (await PreRetirementPage.current_age).isClickable()
        await PreRetirementPage.current_age.setValue(retirementData.current_age_40)
        await PreRetirementPage.retirement_age.setValue(retirementData.retirement_age_68)
        await (await PreRetirementPage.current_income).isClickable()
        await PreRetirementPage.current_income.click()
        await PreRetirementPage.current_income.setValue(retirementData.current_income)
        await await PreRetirementPage.spouse_income.click()
        await PreRetirementPage.spouse_income.setValue(retirementData.spouse_income)
        await PreRetirementPage.current_savings.click()
        await PreRetirementPage.current_savings.setValue(retirementData.current_savings)
        await PreRetirementPage.annual_saving_percentage.click()
        await PreRetirementPage.annual_saving_percentage.setValue(retirementData.annual_saving_percentage)
        await PreRetirementPage.savings_increase_rate.click()
        await PreRetirementPage.savings_increase_rate.setValue(retirementData.savings_increase_rate)
        await (await PreRetirementPage.no_social_benefits).click()
        await (await PreRetirementPage.yes_social_benefits).click()
        await (await PreRetirementPage.social_security_amount).isClickable()
        await (await PreRetirementPage.social_security_amount).click()
        // setting up the values in social security income
        await PreRetirementPage.social_security_amount.setValue(retirementData.social_security_amount)
        await PreRetirementPage.single.click()
        await PreRetirementPage.married.click()
        await PreRetirementPage.submit_btn.click()
        await PreRetirementPage.results_message.waitForDisplayed()
        await expect(PreRetirementPage.results_message).toHaveText('$833 a month.')
        await expect(PreRetirementPage.email_btn).toBeDisplayed()
    });

    
});