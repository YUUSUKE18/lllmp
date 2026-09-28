import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        String input = "7:3,2:2";
        List<Integer> sequence = parseAndGenerate(input).stream().mapToInt(Integer::intValue).collect(Collectors.toList());
        int count = sequence.size();
        int sum = sequence.stream().mapToInt(Integer::intValue).sum();
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static List<Integer> parseAndGenerate(String input) {
        return input.split(",")
                .stream()
                .map(s -> {
                    String[] parts = s.trim().split(":");
                    if (parts.length != 2) return null;
                    try {
                        int value = Integer.parseInt(parts[0]);
                        int count = Integer.parseInt(parts[1]);
                        if (count < 0) return null;
                        List<Integer> list = new ArrayList<>();
                        for (int i = 0; i < count; i++) {
                            list.add(value);
                        }
                        return list;
                    } catch (NumberFormatException e) {
                        return null;
                    }
                })
                .filter(s -> s != null)
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}
