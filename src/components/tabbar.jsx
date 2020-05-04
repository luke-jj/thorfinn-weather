import React from 'react'
import styled from 'styled-components'
import { Button } from '../elements'

const TabBar = ({ className }) => (
  <div className={className}>
    <TabWrapper>
      <Button small secondary active>
        Recent
      </Button>
    </TabWrapper>
    <TabWrapper>
      <Button small secondary disabled>
        Favorites
      </Button>
    </TabWrapper>
  </div>
)

const TabWrapper = styled.div`
  margin: 0 2px;
`

export default styled(TabBar)`
  display: flex;
  margin: 20px auto 10px;
  width: 70%;
  align-items: center;
  height: 40px;
`
