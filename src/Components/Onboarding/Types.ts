/**
 * The props interface that the step needs to implement for the wizard.
 */
export interface StepProps {
  onNextButtonPressed: () => void
}

export interface FollowProps {
  updateFollowCount: (count: number) => void
}
