import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

import {Button} from '../src'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs'

const stories = storiesOf('Button', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

// Knobs for React props
stories.add('basic', () => <Button>{text('Label', 'Hello Storybook')}</Button>)
