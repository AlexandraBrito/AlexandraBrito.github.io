// Shared topic color configuration
export const topicColors = {
  sewing: {
    bg: '#F9BBBC', // Dusty pink
    text: 'var(--navy-blue)' // Navy text
  },
  code: {
    bg: '#729DC7', // Muted blue
    text: 'white'
  },
  gardening: {
    bg: '#A2A655', // Sage green
    text: 'white'
  },
  cooking: {
    bg: '#E87461', // Coral/terracotta
    text: 'white'
  },
  diy: {
    bg: '#FEC10F', // Golden yellow
    text: 'var(--navy-blue)' // Navy text
  },
  life: {
    bg: '#BBDFEE', // Light blue
    text: 'var(--navy-blue)' // Navy text
  }
};

export const getTopicColor = (topicName) => {
  return topicColors[topicName?.toLowerCase()] || {
    bg: '#8b6f47',
    text: 'white'
  };
};
