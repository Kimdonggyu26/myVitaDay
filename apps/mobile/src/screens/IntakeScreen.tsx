import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '../styles';
import { AppTheme } from '../types';

type IntakeScreenProps = {
  theme: AppTheme;
  isDarkMode: boolean;
};

type SlotStatus = 'pending' | 'taken' | 'partial' | 'missed';
type IntakePeriod = 'morning' | 'lunch' | 'night';

type IntakeSchedule = {
  period: IntakePeriod;
  time: string;
};

type SavedSupplement = {
  id: string;
  name: string;
  schedules: IntakeSchedule[];
};

type RoutineItem = {
  id: string;
  name: string;
  period: IntakePeriod;
  time: string;
};

const periodOrder: IntakePeriod[] = ['morning', 'lunch', 'night'];
const periodLabels: Record<IntakePeriod, string> = {
  morning: '아침',
  lunch: '점심',
  night: '저녁',
};

const periodChoices: Array<{ id: IntakePeriod; label: string }> = [
  { id: 'morning', label: '아침' },
  { id: 'lunch', label: '점심' },
  { id: 'night', label: '저녁' },
];

const periodTimeChoices: Record<IntakePeriod, string[]> = {
  morning: ['06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
  lunch: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
  night: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'],
};

const initialSupplements: SavedSupplement[] = [
  { id: 'multi', name: '멀티비타민', schedules: [{ period: 'morning', time: '08:00' }] },
  { id: 'probio', name: '유산균', schedules: [{ period: 'morning', time: '08:00' }] },
  { id: 'omega3', name: '오메가3', schedules: [{ period: 'morning', time: '08:30' }] },
  {
    id: 'vitc',
    name: '비타민C',
    schedules: [
      { period: 'lunch', time: '13:00' },
      { period: 'night', time: '21:00' },
    ],
  },
  { id: 'magnesium', name: '마그네슘', schedules: [{ period: 'night', time: '21:30' }] },
  { id: 'theanine', name: '테아닌', schedules: [{ period: 'night', time: '22:00' }] },
];

const calendarStatuses: Record<number, 'complete' | 'partial' | 'missed' | 'empty'> = {
  1: 'complete',
  2: 'complete',
  3: 'partial',
  4: 'complete',
  5: 'missed',
  6: 'complete',
  7: 'complete',
  8: 'complete',
  9: 'partial',
  10: 'complete',
  11: 'complete',
  12: 'partial',
  13: 'complete',
  14: 'complete',
  15: 'complete',
  16: 'missed',
  17: 'complete',
  18: 'complete',
  19: 'partial',
  20: 'complete',
  21: 'complete',
  22: 'complete',
  23: 'complete',
  24: 'partial',
  25: 'empty',
  26: 'empty',
  27: 'empty',
  28: 'empty',
  29: 'empty',
  30: 'empty',
  31: 'empty',
};

const weekdayLabels = ['일', '월', '화', '수', '목', '금', '토'];

function compareTime(a: string, b: string) {
  return a.localeCompare(b);
}

export function IntakeScreen({ theme, isDarkMode }: IntakeScreenProps) {
  const [savedSupplements, setSavedSupplements] = useState(initialSupplements);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [slotStatuses, setSlotStatuses] = useState<Record<IntakePeriod, SlotStatus>>({
    morning: 'pending',
    lunch: 'pending',
    night: 'pending',
  });
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isRoutineExpanded, setIsRoutineExpanded] = useState(false);

  const routineItems = useMemo<RoutineItem[]>(() => {
    return savedSupplements
      .flatMap((supplement) =>
        supplement.schedules.map((schedule, index) => ({
          id: `${supplement.id}-${index}`,
          name: supplement.name,
          period: schedule.period,
          time: schedule.time,
        })),
      )
      .sort((a, b) => compareTime(a.time, b.time));
  }, [savedSupplements]);

  const groupedSlots = useMemo(() => {
    return periodOrder.map((period) => ({
      id: period,
      label: `${periodLabels[period]} 루틴`,
      supplements: routineItems.filter((item) => item.period === period),
    }));
  }, [routineItems]);

  const monthlySummary = useMemo(() => {
    const values = Object.values(calendarStatuses);
    return {
      complete: values.filter((value) => value === 'complete').length,
      partial: values.filter((value) => value === 'partial').length,
      missed: values.filter((value) => value === 'missed').length,
    };
  }, []);

  const calendarCells = useMemo(() => {
    const cells: Array<{ type: 'blank' } | { type: 'day'; day: number }> = [];
    for (let i = 0; i < 5; i += 1) {
      cells.push({ type: 'blank' });
    }
    for (let day = 1; day <= 31; day += 1) {
      cells.push({ type: 'day', day });
    }
    return cells;
  }, []);

  const toggleSupplementCheck = (routineItemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [routineItemId]: !prev[routineItemId],
    }));
  };

  const applySlotStatus = (slotId: IntakePeriod) => {
    const slot = groupedSlots.find((item) => item.id === slotId);

    if (!slot || slot.supplements.length === 0) {
      return;
    }

    const checkedCount = slot.supplements.filter((item) => checkedItems[item.id]).length;

    let nextStatus: SlotStatus = 'missed';
    if (checkedCount === slot.supplements.length) {
      nextStatus = 'taken';
    } else if (checkedCount > 0) {
      nextStatus = 'partial';
    }

    setSlotStatuses((prev) => ({
      ...prev,
      [slotId]: nextStatus,
    }));
  };

  const markSlotMissed = (slotId: IntakePeriod) => {
    const slot = groupedSlots.find((item) => item.id === slotId);

    if (!slot) {
      return;
    }

    setCheckedItems((prev) => {
      const next = { ...prev };
      slot.supplements.forEach((item) => {
        next[item.id] = false;
      });
      return next;
    });

    setSlotStatuses((prev) => ({
      ...prev,
      [slotId]: 'missed',
    }));
  };

  const updateSupplementSchedule = (
    supplementId: string,
    scheduleIndex: number,
    patch: Partial<IntakeSchedule>,
  ) => {
    setSavedSupplements((prev) =>
      prev.map((item) =>
        item.id === supplementId
          ? {
              ...item,
              schedules: item.schedules.map((schedule, index) =>
                index === scheduleIndex ? { ...schedule, ...patch } : schedule,
              ),
            }
          : item,
      ),
    );
    setSlotStatuses({
      morning: 'pending',
      lunch: 'pending',
      night: 'pending',
    });
  };

  const toggleSecondSchedule = (supplementId: string) => {
    setSavedSupplements((prev) =>
      prev.map((item) => {
        if (item.id !== supplementId) {
          return item;
        }

        if (item.schedules.length > 1) {
          return {
            ...item,
            schedules: [item.schedules[0]],
          };
        }

        return {
          ...item,
          schedules: [
            ...item.schedules,
            {
              period: 'night',
              time: periodTimeChoices.night[0],
            },
          ],
        };
      }),
    );
    setSlotStatuses({
      morning: 'pending',
      lunch: 'pending',
      night: 'pending',
    });
  };

  const getSlotStatusLabel = (status: SlotStatus) => {
    if (status === 'taken') {
      return '복용 완료';
    }

    if (status === 'partial') {
      return '일부 복용 완료';
    }

    if (status === 'missed') {
      return '미복용';
    }

    return '체크 전';
  };

  const getSlotStatusColor = (status: SlotStatus) => {
    if (status === 'taken') {
      return '#25b36a';
    }

    if (status === 'partial') {
      return theme.point;
    }

    if (status === 'missed') {
      return '#f06c5c';
    }

    return theme.textSubtle;
  };

  const getCalendarFill = (day: number) => {
    const status = calendarStatuses[day];

    if (status === 'complete') {
      return '#25b36a';
    }

    if (status === 'partial') {
      return '#eaf4ff';
    }

    if (status === 'missed') {
      return '#fff2ef';
    }

    return 'transparent';
  };

  const getCalendarTextColor = (day: number) => {
    const status = calendarStatuses[day];

    if (status === 'complete') {
      return '#ffffff';
    }

    if (status === 'partial') {
      return theme.point;
    }

    if (status === 'missed') {
      return '#f06c5c';
    }

    return theme.textMuted;
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.intakeContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intakeHeroHeader}>
          <Text style={[styles.resultsHeaderTitle, { color: theme.textStrong }]}>복용기록</Text>
          <Text style={[styles.intakeHeroDescription, { color: theme.textMuted }]}>
            시간에 맞춰 하나씩 체크하고, 이번 달 복용 흐름까지 한눈에 볼 수 있어요.
          </Text>
        </View>

        <View
          style={[
            styles.detailSection,
            {
              backgroundColor: theme.surface,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <Pressable style={styles.intakeSectionToggle} onPress={() => setIsRoutineExpanded((prev) => !prev)}>
            <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>오늘 복용 루틴</Text>
            <Ionicons
              name={isRoutineExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.textMuted}
            />
          </Pressable>

          {isRoutineExpanded ? (
            <View style={styles.intakeSlotList}>
              {groupedSlots.map((slot, index) => {
                const status = slotStatuses[slot.id];
                const isLast = index === groupedSlots.length - 1;

                return (
                  <View
                    key={slot.id}
                    style={[
                      styles.intakeSlotCard,
                      {
                        borderBottomWidth: isLast ? 0 : 1,
                        borderColor: theme.borderSoft,
                      },
                    ]}
                  >
                    <View style={styles.intakeSlotHeader}>
                      <Text style={[styles.intakeSlotTitle, { color: theme.textStrong }]}>
                        {slot.label}
                      </Text>
                      <Text
                        style={[
                          styles.intakeSlotStatus,
                          {
                            color: getSlotStatusColor(status),
                          },
                        ]}
                      >
                        {getSlotStatusLabel(status)}
                      </Text>
                    </View>

                    {slot.supplements.length === 0 ? (
                      <Text style={[styles.personalHelperText, { color: theme.textMuted }]}>
                        아직 이 시간대에 복용중인 영양제가 없어요.
                      </Text>
                    ) : (
                      <View style={styles.intakeChecklist}>
                        {slot.supplements.map((item) => {
                          const checked = Boolean(checkedItems[item.id]);

                          return (
                            <Pressable
                              key={item.id}
                              style={[
                                styles.intakeChecklistItem,
                                {
                                  borderColor: theme.borderSoft,
                                },
                              ]}
                              onPress={() => toggleSupplementCheck(item.id)}
                            >
                              <View style={styles.intakeChecklistLeft}>
                                <View
                                  style={[
                                    styles.intakeCheckbox,
                                    {
                                      borderColor: checked ? theme.point : theme.borderSoft,
                                      backgroundColor: checked ? theme.point : theme.surface,
                                    },
                                  ]}
                                >
                                  {checked && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                                </View>

                                <View style={styles.intakeChecklistTextWrap}>
                                  <Text style={[styles.intakeChecklistName, { color: theme.textStrong }]}>
                                    {item.name}
                                  </Text>
                                  <Text style={[styles.intakeChecklistTime, { color: theme.textMuted }]}>
                                    {item.time} 알림
                                  </Text>
                                </View>
                              </View>

                              <Text style={styles.intakeSupplementEmoji}>💊</Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    )}

                    <View style={styles.intakeActionRow}>
                      <Pressable
                        style={[
                          styles.intakeActionButton,
                          {
                            backgroundColor: isDarkMode ? theme.mutedSurface : theme.softSurface,
                            borderColor: theme.borderSoft,
                          },
                        ]}
                        onPress={() => applySlotStatus(slot.id)}
                      >
                        <Text style={[styles.intakeActionButtonText, { color: theme.textStrong }]}>
                          복용 완료
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[
                          styles.intakeActionButton,
                          {
                            backgroundColor: isDarkMode ? theme.mutedSurface : theme.surface,
                            borderColor: theme.borderSoft,
                          },
                        ]}
                        onPress={() => markSlotMissed(slot.id)}
                      >
                        <Text style={[styles.intakeActionButtonText, { color: theme.textMuted }]}>
                          미복용
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={[styles.intakeCollapsedHint, { color: theme.textMuted }]}>
              오늘 먹을 영양제를 시간대별로 펼쳐서 체크할 수 있어요.
            </Text>
          )}
        </View>

        <View
          style={[
            styles.detailSection,
            {
              backgroundColor: theme.surface,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>복용중인 영양제</Text>
            <Pressable onPress={() => setIsTimeModalOpen(true)}>
              <Text style={[styles.sectionLink, { color: theme.point }]}>시간 설정</Text>
            </Pressable>
          </View>

          <View style={styles.intakeSavedList}>
            {savedSupplements.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.intakeSavedItem,
                  {
                    backgroundColor: isDarkMode ? theme.mutedSurface : theme.surfaceAlt,
                    borderColor: theme.borderSoft,
                  },
                ]}
              >
                <View style={styles.intakeSavedTitleRow}>
                  <Text style={styles.intakeSupplementEmoji}>💊</Text>
                  <Text style={[styles.intakeSavedName, { color: theme.textStrong }]}>{item.name}</Text>
                </View>
                <Text style={[styles.intakeSavedMeta, { color: theme.textMuted }]}>
                  {item.schedules
                    .map((schedule) => `${periodLabels[schedule.period]} ${schedule.time}`)
                    .join(' · ')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.detailSection,
            {
              backgroundColor: theme.surface,
              borderColor: theme.borderSoft,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>5월 복용 캘린더</Text>
            <Text style={[styles.sectionLink, { color: theme.textMuted }]}>이번 달 흐름</Text>
          </View>

          <View style={styles.intakeCalendarLegend}>
            <View style={styles.intakeLegendItem}>
              <View style={[styles.intakeLegendDot, { backgroundColor: '#25b36a' }]} />
              <Text style={[styles.intakeLegendText, { color: theme.textMuted }]}>복용 완료</Text>
            </View>
            <View style={styles.intakeLegendItem}>
              <View style={[styles.intakeLegendDot, { backgroundColor: '#eaf4ff' }]} />
              <Text style={[styles.intakeLegendText, { color: theme.textMuted }]}>일부 완료</Text>
            </View>
            <View style={styles.intakeLegendItem}>
              <View style={[styles.intakeLegendDot, { backgroundColor: '#fff2ef' }]} />
              <Text style={[styles.intakeLegendText, { color: theme.textMuted }]}>미복용</Text>
            </View>
          </View>

          <View style={styles.intakeCalendarWeekdays}>
            {weekdayLabels.map((label) => (
              <Text key={label} style={[styles.intakeCalendarWeekday, { color: theme.textSubtle }]}>
                {label}
              </Text>
            ))}
          </View>

          <View style={styles.intakeCalendarGrid}>
            {calendarCells.map((cell, index) => {
              if (cell.type === 'blank') {
                return <View key={`blank-${index}`} style={styles.intakeCalendarCell} />;
              }

              const isToday = cell.day === 12;

              return (
                <View
                  key={cell.day}
                  style={[
                    styles.intakeCalendarCell,
                    styles.intakeCalendarDay,
                    {
                      backgroundColor: getCalendarFill(cell.day),
                      borderColor: isToday ? theme.point : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.intakeCalendarDayText,
                      {
                        color: getCalendarTextColor(cell.day),
                      },
                    ]}
                  >
                    {cell.day}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.intakeMonthlySummaryRow}>
            <View
              style={[
                styles.intakeMonthlySummaryCard,
                {
                  backgroundColor: isDarkMode ? theme.mutedSurface : theme.softSurface,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <Text style={[styles.intakeMonthlySummaryLabel, { color: theme.textSubtle }]}>
                완료한 날
              </Text>
              <Text style={[styles.intakeMonthlySummaryValue, { color: theme.textStrong }]}>
                {monthlySummary.complete}일
              </Text>
            </View>
            <View
              style={[
                styles.intakeMonthlySummaryCard,
                {
                  backgroundColor: isDarkMode ? theme.mutedSurface : theme.softSurface,
                  borderColor: theme.borderSoft,
                },
              ]}
            >
              <Text style={[styles.intakeMonthlySummaryLabel, { color: theme.textSubtle }]}>
                놓친 날
              </Text>
              <Text style={[styles.intakeMonthlySummaryValue, { color: theme.textStrong }]}>
                {monthlySummary.missed}일
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isTimeModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsTimeModalOpen(false)}
      >
        <View style={styles.intakeModalBackdrop}>
          <View
            style={[
              styles.intakeModalCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSoft,
              },
            ]}
          >
            <View style={styles.intakeModalHeader}>
              <View style={styles.intakeModalHeaderText}>
                <Text style={[styles.detailSectionTitle, { color: theme.textStrong }]}>시간 설정</Text>
                <Text style={[styles.personalHelperText, { color: theme.textMuted }]}>
                  아침, 점심, 저녁 중에 먼저 고르고 그 시간대 안에서 알림 시간을 정해보세요.
                </Text>
              </View>
              <Pressable style={styles.intakeModalClose} onPress={() => setIsTimeModalOpen(false)}>
                <Ionicons name="close" size={20} color={theme.textStrong} />
              </Pressable>
            </View>

            <ScrollView style={styles.intakeModalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.intakeModalList}>
                {savedSupplements.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.intakeModalItem,
                      {
                        borderColor: theme.borderSoft,
                      },
                    ]}
                  >
                    <View style={styles.intakeModalItemHeader}>
                      <Text style={[styles.intakeSavedName, { color: theme.textStrong }]}>{item.name}</Text>
                      <Pressable
                        onPress={() => toggleSecondSchedule(item.id)}
                        style={[
                          styles.intakeTwiceButton,
                          {
                            backgroundColor:
                              item.schedules.length > 1
                                ? theme.point
                                : isDarkMode
                                  ? theme.mutedSurface
                                  : theme.surfaceAlt,
                            borderColor: item.schedules.length > 1 ? theme.point : theme.borderSoft,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.intakeTwiceButtonText,
                            {
                              color: item.schedules.length > 1 ? '#ffffff' : theme.textStrong,
                            },
                          ]}
                        >
                          하루 두 번
                        </Text>
                      </Pressable>
                    </View>

                    {item.schedules.map((schedule, scheduleIndex) => (
                      <View key={`${item.id}-${scheduleIndex}`} style={styles.intakeScheduleEditor}>
                        <Text style={[styles.intakeScheduleEditorLabel, { color: theme.textMuted }]}>
                          {scheduleIndex === 0 ? '기본 복용' : '추가 복용'}
                        </Text>

                        <View style={styles.intakePeriodChoiceRow}>
                          {periodChoices.map((choice) => {
                            const active = schedule.period === choice.id;

                            return (
                              <Pressable
                                key={`${item.id}-${scheduleIndex}-${choice.id}`}
                                style={[
                                  styles.intakePeriodChoice,
                                  {
                                    backgroundColor: active
                                      ? theme.point
                                      : isDarkMode
                                        ? theme.mutedSurface
                                        : theme.surfaceAlt,
                                    borderColor: active ? theme.point : theme.borderSoft,
                                  },
                                ]}
                                onPress={() =>
                                  updateSupplementSchedule(item.id, scheduleIndex, {
                                    period: choice.id,
                                    time: periodTimeChoices[choice.id][0],
                                  })
                                }
                              >
                                <Text
                                  style={[
                                    styles.intakePeriodChoiceText,
                                    {
                                      color: active ? '#ffffff' : theme.textStrong,
                                    },
                                  ]}
                                >
                                  {choice.label}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>

                        <View style={styles.intakeTimeChoiceRow}>
                          {periodTimeChoices[schedule.period].map((time) => {
                            const active = schedule.time === time;

                            return (
                              <Pressable
                                key={`${item.id}-${scheduleIndex}-${time}`}
                                style={[
                                  styles.intakeTimeChoice,
                                  {
                                    backgroundColor: active
                                      ? theme.point
                                      : isDarkMode
                                        ? theme.mutedSurface
                                        : theme.surfaceAlt,
                                    borderColor: active ? theme.point : theme.borderSoft,
                                  },
                                ]}
                                onPress={() => updateSupplementSchedule(item.id, scheduleIndex, { time })}
                              >
                                <Text
                                  style={[
                                    styles.intakeTimeChoiceText,
                                    {
                                      color: active ? '#ffffff' : theme.textStrong,
                                    },
                                  ]}
                                >
                                  {time}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
