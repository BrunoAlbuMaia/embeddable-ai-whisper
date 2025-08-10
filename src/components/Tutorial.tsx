import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TutorialProps {
  onComplete?: () => void;
}

export function Tutorial({ onComplete }: TutorialProps) {
  const { t } = useTranslation();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t('tutorial.welcome')}</h2>
          <p>{t('tutorial.welcomeDesc')}</p>
        </div>
      ),
      placement: 'center',
    },
    {
      target: '[data-tutorial="dashboard"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold">{t('tutorial.dashboard')}</h3>
          <p>{t('tutorial.dashboardDesc')}</p>
        </div>
      ),
    },
    {
      target: '[data-tutorial="chats"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold">{t('tutorial.chats')}</h3>
          <p>{t('tutorial.chatsDesc')}</p>
        </div>
      ),
    },
    {
      target: '[data-tutorial="documents"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold">{t('tutorial.documents')}</h3>
          <p>{t('tutorial.documentsDesc')}</p>
        </div>
      ),
    },
    {
      target: '[data-tutorial="segments"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold">{t('tutorial.segments')}</h3>
          <p>{t('tutorial.segmentsDesc')}</p>
        </div>
      ),
    },
    {
      target: '[data-tutorial="plans"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold">{t('tutorial.plans')}</h3>
          <p>{t('tutorial.plansDesc')}</p>
        </div>
      ),
    },
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t('tutorial.complete')}</h2>
          <p>{t('tutorial.completeDesc')}</p>
        </div>
      ),
      placement: 'center',
    },
  ];

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('docs-ia-tutorial-completed');
    if (!hasSeenTutorial) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem('docs-ia-tutorial-completed', 'true');
      onComplete?.();
    } else if (action === 'next') {
      setStepIndex(index + 1);
    } else if (action === 'prev') {
      setStepIndex(index - 1);
    }
  };

  const skipTutorial = () => {
    setRun(false);
    localStorage.setItem('docs-ia-tutorial-completed', 'true');
    onComplete?.();
  };

  if (!run) return null;

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        disableOverlayClose
        locale={{
          back: t('tutorial.prev'),
          close: t('common.close'),
          last: t('tutorial.finish'),
          next: t('tutorial.next'),
          skip: t('tutorial.skip'),
        }}
        styles={{
          options: {
            primaryColor: 'hsl(var(--primary))',
            backgroundColor: 'hsl(var(--background))',
            textColor: 'hsl(var(--foreground))',
            arrowColor: 'hsl(var(--background))',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
          },
          tooltip: {
            borderRadius: 'calc(var(--radius) - 2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          buttonNext: {
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderRadius: 'calc(var(--radius) - 2px)',
          },
          buttonBack: {
            color: 'hsl(var(--muted-foreground))',
          },
          buttonSkip: {
            color: 'hsl(var(--muted-foreground))',
          },
        }}
      />
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={skipTutorial}
          className="bg-background/80 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}