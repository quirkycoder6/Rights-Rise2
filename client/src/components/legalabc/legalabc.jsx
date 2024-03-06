import './legalabc.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Dailyquest from '../dailyquest';

export default function Legalabc() {
    
    const navigate = useNavigate();

    return (
      <div className='container-legalabc'>
        <div className="body-legalabc">
          <div className="main-section-legalabc">
            <h2>LegalABC</h2>
            <div className="legal-points">
            <ul style={{ listStyleType: 'disc' }}>
              <li>
                <p>Imagine a court is like a big game where grown-ups solve problems.</p>
                <p>Judges are like referees, and they decide what's fair and right. It's a bit like playing fair in a game with rules.</p>
              </li>
              <li>
                <p>If someone is accused of doing something wrong, they have the right to defend themselves, just like in a</p>
                <p>game where everyone gets a chance to explain their side.</p>
              </li>
              <li>
                <p>Laws are big, important rules made by the government to keep everyone safe.</p>
                <p>Rules are like mini-laws for specific places, like schools or homes.</p>
              </li>
              <li>
                <p>Contracts are like promises that people write down. When you promise to do something, like finishing your homework, that's like a mini-contract. It's important to keep your promises!</p>
              </li>
              <li>
                <p>If you see something wrong or feel uncomfortable, tell a grown-up you trust.</p>
                <p>It's like being a superhero by looking out for others.</p>
              </li>
              <li>
                <p>Child labor laws are like rules that make sure kids have time for fun and school. It's a bit like having a balance between work and play.</p>
              </li>
              <li>
                <p>Freedom of speech is like being able to express your thoughts and ideas. It's important to share your opinions respectfully, just like taking turns in a conversation.</p>
              </li>
              <li>
                Explore the <a href='https://archive.crin.org/en/guides/legal/legal-assistance-toolkit/legal-assistance-children.html' style={{textDecoration: "underline"}} target='_blank' rel='noopener noreferrer'>Legal Assistance Toolkit</a>  provided by CRIN for legal assistance on children's rights.
              </li>
              <li>
                Visit <a href='https://www.end-violence.org/members/children-rights-advocacy-and-legal-aid-foundation' style={{textDecoration: "underline"}} target='_blank' rel='noopener noreferrer'>Children Rights Advocacy and Legal Aid Foundation</a> for information on their work.
              </li>
              <li>
                Learn about legal aid and protection for children from <a href='https://www.haqcrc.org/our-work/protection/legal-aid/' style={{textDecoration: "underline"}} target='_blank' rel='noopener noreferrer'>HAQ: Centre for Child Rights</a>.
              </li>
            </ul>
          </div>
          </div>
          <div className="sub-section-legalabc">
            <div className="flex items-center flex-col gap-3">
              <Dailyquest />
              <Dailyquest />
              <Dailyquest />
            </div>
            <button onClick={() => navigate('/lawquest')}>Back to menu</button>
          </div>
        </div>
      </div>
    )
}


