export type FaqItem = {
  question: string
  answer: string
}

export const FaqData:FaqItem[] = [
  {
    question: "What if there are no winners?",
    answer: "If TBCC in the prize pools isn't won it doesn't go to waste! Unclaimed TBCC rolls over to the next Lottery round."
  },
  {
    question: "My ticket matches several numbers but I can't claim a prize",
    answer: "Tickets are only eligible for prizes if matching numbers from left to right. See the Lottery documentation for a thorough explanation."
  },
  {
    question: "How are prizes broken down between brackets?",
    answer: "Each bracket's prize pool is a portion of the total TBCC in each Lottery round."
  },
  {
    question: "Can I swap my tickets back to TBCC?",
    answer: "No, once purchased you will not be able to convert your ticket back to TBCC"
  },
  {
    question: "How often is the lottery?",
    answer: "A lottery draw occurs every 7 days. Next round starts every Sunday at 04:00 UTC"
  },
  {
    question: "What transaction fee will I pay for buying tickets?",
    answer: "Every ticket purchase you make will be one transaction. Purchasing a single ticket in a Lottery purchase will cost the normal amount of fees for a transaction. However, buying more tickets in that purchase will increase the fee. Buying 100 tickets rather than 1 will not multiply the fee by 100, but may increase the fee amount by 5-6 times (though this varies)."
  },
  {
    question: "How does the bulk discount work?",
    answer: "The bulk discount rewards buying larger amounts of tickets with a scaling discount. If you're only buying 2 tickets, the discount is negligible, but will add up quickly as you increase the number of tickets to buy in one transaction. The discount only applies to each transaction up to 100 tickets. The discount does not carry over to the next transaction or next round."
  },
  {
    question: "Why can I only buy 100 tickets?",
    answer: "You can only buy a maximum of 100 tickets in one purchase, but you can make multiple purchases. There's nothing to stop you buying more tickets after your first 100."
  },
  {
    question: "If I manually create two or more tickets with the same numbers and they win, am I eligible for prizes for each ticket?",
    answer: "Yes, each ticket is treated as a separate entry to the Lottery. Keep in mind that the prizes will not be 1:1 though, as each winning ticket you have dilutes each share of the bracket's total prizes."
  },
  {
    question: "Injection schedule: When is TBCC added to the lottery?",
    answer: "When people buy tickets, the TBCC they spend is added to the lottery pot. In addition, all TBCC that wasn't won in previous round (except provider's fee and burning) is added (injected) to the lottery pot."
  },
]
