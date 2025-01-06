import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';
import { LabelPosition, ContentType } from 'recharts/types/component/Label';
import { ViewBox } from 'recharts/types/util/types';

type TeamData = {
  game: string;
  argentina: number;
  [key: string]: number | string;
};

type Team = 'Argentina' | 'Mexico' | 'Netherlands' | 'Poland' | 'France' | 'Australia' | 'Croatia' | 'SaudiArabia';

// Sample team data for possession percentages (for each game)
const teamData: TeamData[] = [
  {
    game: 'vs Mexico',
    argentina: 50,
    Mexico: 36,
  },
  {
    game: 'vs Netherlands',
    argentina: 44,
    Netherlands: 45,
  },
  {
    game: 'vs Poland',
    argentina: 67,
    Poland: 24,
  },
  {
    game: 'vs France',
    argentina: 46,
    France: 40,
  },
  {
    game: 'vs Australia',
    argentina: 53,
    Australia: 35,
  },
  {
    game: 'vs Croatia',
    argentina: 34,
    Croatia: 54,
  },
  {
    game: 'vs Saudi Arabia',
    argentina: 64,
    SaudiArabia: 24,
  },
];

// Define colors for each team
const teamColors = {
  Mexico: '#56042C',
  Netherlands: '#FFBA2F',
  Poland: '#5899D4',
  France: '#217A70',
  Australia: '#F5B49D',
  Croatia: '#2C7759',
  SaudiArabia: '#75AE18',
  Argentina: '#0066B3', // Argentina is included with a fixed color
};

const StackedBarChartArgentina = () => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]); 
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); 

  const toggleTeamSelection = (team: Team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  // Custom label renderer for the bars
  const renderCustomLabel = (props: { team: any; string?: any; display?: any; overflow?: any; visibility?: any; order?: any; color?: any; width: any; height: any; fontFamily?: any; fontSize?: any; fontStyle?: any; fontWeight?: any; letterSpacing?: any; filter?: any; fill?: any; values?: any; clipPath?: any; cursor?: any; direction?: any; fontSizeAdjust?: any; fontStretch?: any; fontVariant?: any; imageRendering?: any; opacity?: any; paintOrder?: any; pointerEvents?: any; rotate?: any; scale?: any; textRendering?: any; transform?: any; unicodeBidi?: any; wordSpacing?: any; writingMode?: any; mask?: any; offset?: number | undefined; textDecoration?: any; azimuth?: any; clip?: any; alignmentBaseline?: any; baselineShift?: any; clipRule?: any; colorInterpolation?: any; colorRendering?: any; dominantBaseline?: any; fillOpacity?: any; fillRule?: any; floodColor?: any; floodOpacity?: any; glyphOrientationVertical?: any; lightingColor?: any; markerEnd?: any; markerMid?: any; markerStart?: any; shapeRendering?: any; stopColor?: any; stopOpacity?: any; stroke?: any; strokeDasharray?: any; strokeDashoffset?: any; strokeLinecap?: any; strokeLinejoin?: any; strokeMiterlimit?: any; strokeOpacity?: any; strokeWidth?: any; textAnchor?: any; vectorEffect?: any; children?: React.ReactNode; ref?: any; style?: any; path?: any; key?: any; suppressHydrationWarning?: any; className?: string | undefined; id?: any; lang?: any; tabIndex?: any; role?: any; "aria-activedescendant"?: any; "aria-atomic"?: any; "aria-autocomplete"?: any; "aria-braillelabel"?: any; "aria-brailleroledescription"?: any; "aria-busy"?: any; "aria-checked"?: any; "aria-colcount"?: any; "aria-colindex"?: any; "aria-colindextext"?: any; "aria-colspan"?: any; "aria-controls"?: any; "aria-current"?: any; "aria-describedby"?: any; "aria-description"?: any; "aria-details"?: any; "aria-disabled"?: any; "aria-dropeffect"?: any; "aria-errormessage"?: any; "aria-expanded"?: any; "aria-flowto"?: any; "aria-grabbed"?: any; "aria-haspopup"?: any; "aria-hidden"?: any; "aria-invalid"?: any; "aria-keyshortcuts"?: any; "aria-label"?: any; "aria-labelledby"?: any; "aria-level"?: any; "aria-live"?: any; "aria-modal"?: any; "aria-multiline"?: any; "aria-multiselectable"?: any; "aria-orientation"?: any; "aria-owns"?: any; "aria-placeholder"?: any; "aria-posinset"?: any; "aria-pressed"?: any; "aria-readonly"?: any; "aria-relevant"?: any; "aria-required"?: any; "aria-roledescription"?: any; "aria-rowcount"?: any; "aria-rowindex"?: any; "aria-rowindextext"?: any; "aria-rowspan"?: any; "aria-selected"?: any; "aria-setsize"?: any; "aria-sort"?: any; "aria-valuemax"?: any; "aria-valuemin"?: any; "aria-valuenow"?: any; "aria-valuetext"?: any; dangerouslySetInnerHTML?: any; onCopy?: any; onCopyCapture?: any; onCut?: any; onCutCapture?: any; onPaste?: any; onPasteCapture?: any; onCompositionEnd?: any; onCompositionEndCapture?: any; onCompositionStart?: any; onCompositionStartCapture?: any; onCompositionUpdate?: any; onCompositionUpdateCapture?: any; onFocus?: any; onFocusCapture?: any; onBlur?: any; onBlurCapture?: any; onChange?: any; onChangeCapture?: any; onBeforeInput?: any; onBeforeInputCapture?: any; onInput?: any; onInputCapture?: any; onReset?: any; onResetCapture?: any; onSubmit?: any; onSubmitCapture?: any; onInvalid?: any; onInvalidCapture?: any; onLoad?: any; onLoadCapture?: any; onError?: any; onErrorCapture?: any; onKeyDown?: any; onKeyDownCapture?: any; onKeyPress?: any; onKeyPressCapture?: any; onKeyUp?: any; onKeyUpCapture?: any; onAbort?: any; onAbortCapture?: any; onCanPlay?: any; onCanPlayCapture?: any; onCanPlayThrough?: any; onCanPlayThroughCapture?: any; onDurationChange?: any; onDurationChangeCapture?: any; onEmptied?: any; onEmptiedCapture?: any; onEncrypted?: any; onEncryptedCapture?: any; onEnded?: any; onEndedCapture?: any; onLoadedData?: any; onLoadedDataCapture?: any; onLoadedMetadata?: any; onLoadedMetadataCapture?: any; onLoadStart?: any; onLoadStartCapture?: any; onPause?: any; onPauseCapture?: any; onPlay?: any; onPlayCapture?: any; onPlaying?: any; onPlayingCapture?: any; onProgress?: any; onProgressCapture?: any; onRateChange?: any; onRateChangeCapture?: any; onResize?: any; onResizeCapture?: any; onSeeked?: any; onSeekedCapture?: any; onSeeking?: any; onSeekingCapture?: any; onStalled?: any; onStalledCapture?: any; onSuspend?: any; onSuspendCapture?: any; onTimeUpdate?: any; onTimeUpdateCapture?: any; onVolumeChange?: any; onVolumeChangeCapture?: any; onWaiting?: any; onWaitingCapture?: any; onAuxClick?: any; onAuxClickCapture?: any; onClick?: any; onClickCapture?: any; onContextMenu?: any; onContextMenuCapture?: any; onDoubleClick?: any; onDoubleClickCapture?: any; onDrag?: any; onDragCapture?: any; onDragEnd?: any; onDragEndCapture?: any; onDragEnter?: any; onDragEnterCapture?: any; onDragExit?: any; onDragExitCapture?: any; onDragLeave?: any; onDragLeaveCapture?: any; onDragOver?: any; onDragOverCapture?: any; onDragStart?: any; onDragStartCapture?: any; onDrop?: any; onDropCapture?: any; onMouseDown?: any; onMouseDownCapture?: any; onMouseEnter?: any; onMouseLeave?: any; onMouseMove?: any; onMouseMoveCapture?: any; onMouseOut?: any; onMouseOutCapture?: any; onMouseOver?: any; onMouseOverCapture?: any; onMouseUp?: any; onMouseUpCapture?: any; onSelect?: any; onSelectCapture?: any; onTouchCancel?: any; onTouchCancelCapture?: any; onTouchEnd?: any; onTouchEndCapture?: any; onTouchMove?: any; onTouchMoveCapture?: any; onTouchStart?: any; onTouchStartCapture?: any; onPointerDown?: any; onPointerDownCapture?: any; onPointerMove?: any; onPointerMoveCapture?: any; onPointerUp?: any; onPointerUpCapture?: any; onPointerCancel?: any; onPointerCancelCapture?: any; onPointerEnter?: any; onPointerEnterCapture?: any; onPointerLeave?: any; onPointerLeaveCapture?: any; onPointerOver?: any; onPointerOverCapture?: any; onPointerOut?: any; onPointerOutCapture?: any; onGotPointerCapture?: any; onGotPointerCaptureCapture?: any; onLostPointerCapture?: any; onLostPointerCaptureCapture?: any; onScroll?: any; onScrollCapture?: any; onWheel?: any; onWheelCapture?: any; onAnimationStart?: any; onAnimationStartCapture?: any; onAnimationEnd?: any; onAnimationEndCapture?: any; onAnimationIteration?: any; onAnimationIterationCapture?: any; onTransitionEnd?: any; onTransitionEndCapture?: any; max?: any; media?: any; method?: any; min?: any; name?: any; target?: any; type?: any; crossOrigin?: any; accentHeight?: any; accumulate?: any; additive?: any; allowReorder?: any; alphabetic?: any; amplitude?: any; arabicForm?: any; ascent?: any; attributeName?: any; attributeType?: any; autoReverse?: any; baseFrequency?: any; baseProfile?: any; bbox?: any; begin?: any; bias?: any; by?: any; calcMode?: any; capHeight?: any; clipPathUnits?: any; colorInterpolationFilters?: any; colorProfile?: any; contentScriptType?: any; contentStyleType?: any; cx?: any; cy?: any; d?: any; decelerate?: any; descent?: any; diffuseConstant?: any; divisor?: any; dur?: any; dx?: any; dy?: any; edgeMode?: any; elevation?: any; enableBackground?: any; end?: any; exponent?: any; externalResourcesRequired?: any; filterRes?: any; filterUnits?: any; focusable?: any; format?: any; fr?: any; from?: any; fx?: any; fy?: any; g1?: any; g2?: any; glyphName?: any; glyphOrientationHorizontal?: any; glyphRef?: any; gradientTransform?: any; gradientUnits?: any; hanging?: any; horizAdvX?: any; horizOriginX?: any; href?: any; ideographic?: any; in2?: any; in?: any; intercept?: any; k1?: any; k2?: any; k3?: any; k4?: any; k?: any; kernelMatrix?: any; kernelUnitLength?: any; kerning?: any; keyPoints?: any; keySplines?: any; keyTimes?: any; lengthAdjust?: any; limitingConeAngle?: any; local?: any; markerHeight?: any; markerUnits?: any; markerWidth?: any; maskContentUnits?: any; maskUnits?: any; mathematical?: any; mode?: any; numOctaves?: any; operator?: any; orient?: any; orientation?: any; origin?: any; overlinePosition?: any; overlineThickness?: any; panose1?: any; pathLength?: any; patternContentUnits?: any; patternTransform?: any; patternUnits?: any; points?: any; pointsAtX?: any; pointsAtY?: any; pointsAtZ?: any; preserveAlpha?: any; preserveAspectRatio?: any; primitiveUnits?: any; r?: any; radius?: any; refX?: any; refY?: any; renderingIntent?: any; repeatCount?: any; repeatDur?: any; requiredExtensions?: any; requiredFeatures?: any; restart?: any; result?: any; rx?: any; ry?: any; seed?: any; slope?: any; spacing?: any; specularConstant?: any; specularExponent?: any; speed?: any; spreadMethod?: any; startOffset?: any; stdDeviation?: any; stemh?: any; stemv?: any; stitchTiles?: any; strikethroughPosition?: any; strikethroughThickness?: any; surfaceScale?: any; systemLanguage?: any; tableValues?: any; targetX?: any; targetY?: any; textLength?: any; to?: any; u1?: any; u2?: any; underlinePosition?: any; underlineThickness?: any; unicode?: any; unicodeRange?: any; unitsPerEm?: any; vAlphabetic?: any; version?: any; vertAdvY?: any; vertOriginX?: any; vertOriginY?: any; vHanging?: any; vIdeographic?: any; viewTarget?: any; vMathematical?: any; widths?: any; x1?: any; x2?: any; x: any; xChannelSelector?: any; xHeight?: any; xlinkActuate?: any; xlinkArcrole?: any; xlinkHref?: any; xlinkRole?: any; xlinkShow?: any; xlinkTitle?: any; xlinkType?: any; xmlBase?: any; xmlLang?: any; xmlns?: any; xmlnsXlink?: any; xmlSpace?: any; y1?: any; y2?: any; y: any; yChannelSelector?: any; z?: any; zoomAndPan?: any; viewBox?: ViewBox | undefined; parentViewBox?: ViewBox | undefined; formatter?: Function | undefined; value: any; position?: LabelPosition | undefined; content?: ContentType | undefined; textBreakAll?: boolean | undefined; angle?: number | undefined; index?: number | undefined; }) => {
    const { x, y, width, height, value, team } = props;
    if (!value) return null; // Don't render for empty values

    return (
      <foreignObject
        x={x + width / 2 - 10}
        y={y + height / 2 - 10}
        width={20}
        height={20}
        style={{ pointerEvents: 'none' }}
      >
        <CountryFlag country={team as Team} size={20} />
      </foreignObject>
    );
  };

  const CustomTooltip = ({ active, payload }: { active: boolean; payload: { payload: TeamData }[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h6">{data.game}</Typography>
          {selectedTeams.map((team) => {
            if (Number(data[team]) > 0) { 
              return (
                <Box key={team} display="flex" alignItems="center">
                  <CountryFlag country={team} size={16} />
                  <Typography variant="body2" ml={1}>
                    {team}: {data[team]}%
                  </Typography>
                </Box>
              );
            }
            return null;
          })}
          <Box display="flex" alignItems="center" mb={1}>
            <CountryFlag country="Argentina" size={16} />
            <Typography variant="body2" ml={1}>
              Argentina: {data.argentina}%
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  };

  const filteredData = teamData.map((game) => {
    const filteredGame: { game: string; argentina: number; [key: string]: number | string } = {
      game: game.game,
      argentina: game.argentina,
    };
  
    // Add only the selected teams to the data
    selectedTeams.forEach((team) => {
      if (game[team] !== undefined) {
        filteredGame[team] = game[team];
      }
    });
  
    return filteredGame;
  })
  .filter((game) => selectedTeams.some((team) => game[team] !== undefined));

  const renderBarChart = () => {
    if (selectedTeams.length === 0) {
      return (
        <Box
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '12px',
            width: '100%',
            height: '100%',
            display: 'flex-col',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            marginTop: '20px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
          }}
        >
          <ResponsiveContainer width="100%" height={460}>
            <BarChart data={teamData}>
              <CartesianGrid />
              <XAxis type="category" dataKey="game">
                <Label
                  value="Games"
                  offset={-5}
                  position="insideBottom"
                  style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
                />
              </XAxis>
              <YAxis
                type="number"
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              >
                <Label
                  value="Possession (%)"
                  angle={-90}
                  position="insideLeft"
                  style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          display: 'flex-col',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          marginTop: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
        }}
      >
        <ResponsiveContainer width="100%" height={460}>
          <BarChart data={filteredData}>
            <CartesianGrid />
            <XAxis type="category" dataKey="game">
              <Label
                value="Games"
                offset={-4}
                position="insideBottom"
                style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
              />
            </XAxis>
            <YAxis
              type="number"
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            >
              <Label
                value="Possession (%)"
                angle={-90}
                position="insideLeft"
                style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip active={false} payload={[]} />} />

            <Bar dataKey="argentina" stackId="a" fill={teamColors['Argentina']}>
            <LabelList
                dataKey="argentina"
                content={(props) => {
                  const { x, y, width, height } = props;
  
                  const posX = typeof x === 'number' ? x : 0;
                  const posY = typeof y === 'number' ? y : 0;
                  const barWidth = typeof width === 'number' ? width : 0;
                  const barHeight = typeof height === 'number' ? height : 0;
  
                  return (
                    <foreignObject
                      x={posX + barWidth / 2}
                      y={posY + barHeight / 2}
                      width={20}
                      height={20}
                      style={{ pointerEvents: 'none' }}
                    >
                      <CountryFlag country="Argentina" size={20} />
                    </foreignObject>
                  );
                }}
              />
            </Bar>

            {selectedTeams.map((team) => (
              <Bar key={team} dataKey={team} stackId="a" fill={teamColors[team]}>
                <LabelList
                  dataKey={team}
                  content={(props) => {
                    const { x, y, width, height, value } = props;
                    if (!value) return null; // Don't render for empty values
            
                    const posX = typeof x === 'number' ? x : 0;
                    const posY = typeof y === 'number' ? y : 0;
                    const barWidth = typeof width === 'number' ? width : 0;
                    const barHeight = typeof height === 'number' ? height : 0;
            
                    return (
                      <foreignObject
                        x={posX + barWidth / 2 - 10} // Center horizontally
                        y={posY + barHeight / 2 - 10} // Center vertically
                        width={20}
                        height={20}
                        style={{ pointerEvents: 'none' }}
                      >
                        <CountryFlag country={team} size={20} />
                      </foreignObject>
                    );
                  }}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          Argentina&apos;s Possession vs Selected Teams
        </Typography>
        <IconButton
          onClick={handlePopoverOpen}
          sx={{ marginLeft: '8px', color: 'primary.main' }}
        >
          <InfoIcon />
        </IconButton>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ padding: '16px', maxWidth: '300px', backgroundColor: 'primary.main' }}>
            <Typography variant="body1" sx={{color: 'white'}}>
              This chart shows Argentina&apos;s possession compared to selected teams in various matches. Select teams below to compare their data.
            </Typography>
          </Box>
        </Popover>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '0px',
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '500px',
          display: 'flex',
          marginBottom: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderBarChart()}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          marginTop: '2px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Object.keys(teamColors)
          .filter((team) => team !== 'Argentina')
          .map((team) => (
            <Box
              key={team}
              onClick={() => toggleTeamSelection(team as Team)} // Explicit cast to Team type
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 32px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)', // Box shadow effect
                backgroundColor: selectedTeams.includes(team as Team)
                  ? teamColors[team as Team]
                  : '#FFFFFF', // Background color changes based on selection
                color: selectedTeams.includes(team as Team)
                  ? '#FFFFFF'
                  : teamColors[team as Team], // Text color changes based on selection
                border: `2px solid ${teamColors[team as Team]}`, // Border color based on team color
                transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover
                '&:hover': {
                  backgroundColor: selectedTeams.includes(team as Team)
                    ? teamColors[team as Team]
                    : `${teamColors[team as Team]}33`, // Lighter background on hover when not selected
                  transform: 'scale(1.05)', // Slight scaling effect on hover
                },
              }}
            >
              <CountryFlag country={team as Team} size={32} />
              <Typography
                variant="body1"
                sx={{ marginLeft: '8px', fontWeight: 'bold' }}
              >
                {team}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default StackedBarChartArgentina;