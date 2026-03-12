import { EventEntity } from './event.entity';

export const events: EventEntity[] = [
  {
    id: '1',
    title: 'Next.js Conference 2026',
    date: '2026-04-10T10:00:00.000Z',
    location: 'Kyiv, Ukraine',
    shortDescription: 'Conference about modern React and Next.js development.',
    description:
      'A full-day conference focused on practical Next.js patterns, performance optimization, and real-world case studies for production-grade applications.',
  },
  {
    id: '2',
    title: 'Node.js Backend Workshop',
    date: '2026-04-15T14:00:00.000Z',
    location: 'Lviv, Ukraine',
    shortDescription: 'Hands-on workshop on building APIs with Node.js and NestJS.',
    description:
      'Intensive workshop where participants build a complete REST API with NestJS, including validation, error handling, and background jobs.',
  },
  {
    id: '3',
    title: 'TypeScript for Professionals',
    date: '2026-04-20T09:00:00.000Z',
    location: 'Remote',
    shortDescription: 'Deep dive into advanced TypeScript patterns.',
    description:
      'Online training covering advanced TypeScript features, strict typing for APIs, domain models, and best practices for large codebases.',
  },
  {
    id: '4',
    title: 'Frontend Architecture Meetup',
    date: '2026-05-01T18:00:00.000Z',
    location: 'Kharkiv, Ukraine',
    shortDescription: 'Meetup about scalable frontend architectures.',
    description:
      'Community meetup discussing modular frontend architectures, design systems, state management approaches, and real-life refactoring stories.',
  },
  {
    id: '5',
    title: 'DevOps & CI/CD Basics',
    date: '2026-05-05T16:00:00.000Z',
    location: 'Odesa, Ukraine',
    shortDescription: 'Introduction to CI/CD pipelines and DevOps culture.',
    description:
      'Session for developers who want to understand the fundamentals of CI/CD, deployment strategies, and basic observability for their services.',
  },
];
